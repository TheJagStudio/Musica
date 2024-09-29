import soundfile as sf
import os
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Song, Lyrics, MusicGenerateRecord
import torch
import torchaudio
import numpy as np
from transformers import MusicgenForConditionalGeneration, MusicgenProcessor
from transformers.generation.streamers import BaseStreamer
from diffusers import StableDiffusionPipeline
import openai
from django.conf import settings
from queue import Queue
from threading import Thread
from typing import Optional


model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
processor = MusicgenProcessor.from_pretrained("facebook/musicgen-small")

try:
    pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1", torch_dtype=torch.float16)
    pipe = pipe.to(device)
except Exception as e:
    print(f"Error loading Stable Diffusion: {e}")
    pipe = None  # Handle the case where Stable Diffusion loading fails


class MusicgenStreamer(BaseStreamer):
    def __init__(
        self,
        model: MusicgenForConditionalGeneration,
        device: Optional[str] = None,
        play_steps: Optional[int] = 10,
        stride: Optional[int] = None,
        timeout: Optional[float] = None,
    ):
        self.decoder = model.decoder
        self.audio_encoder = model.audio_encoder
        self.generation_config = model.generation_config
        self.device = device if device is not None else model.device

        self.play_steps = play_steps
        if stride is not None:
            self.stride = stride
        else:
            hop_length = np.prod(self.audio_encoder.config.upsampling_ratios)
            self.stride = hop_length * (play_steps - self.decoder.num_codebooks) // 6
        self.token_cache = None
        self.to_yield = 0

        self.audio_queue = Queue()
        self.stop_signal = None
        self.timeout = timeout

    def apply_delay_pattern_mask(self, input_ids):
        _, decoder_delay_pattern_mask = self.decoder.build_delay_pattern_mask(
            input_ids[:, :1],
            pad_token_id=self.generation_config.decoder_start_token_id,
            max_length=input_ids.shape[-1],
        )
        input_ids = self.decoder.apply_delay_pattern_mask(input_ids, decoder_delay_pattern_mask)

        input_ids = input_ids[input_ids != self.generation_config.pad_token_id].reshape(
            1, self.decoder.num_codebooks, -1
        )

        input_ids = input_ids[None, ...]
        input_ids = input_ids.to(self.audio_encoder.device)

        output_values = self.audio_encoder.decode(
            input_ids,
            audio_scales=[None],
        )
        audio_values = output_values.audio_values[0, 0]
        return audio_values.cpu().float().numpy()

    def put(self, value):
        batch_size = value.shape[0] // self.decoder.num_codebooks
        if batch_size > 1:
            raise ValueError("MusicgenStreamer only supports batch size 1")

        if self.token_cache is None:
            self.token_cache = value
        else:
            self.token_cache = torch.concatenate([self.token_cache, value[:, None]], dim=-1)

        if self.token_cache.shape[-1] % self.play_steps == 0:
            audio_values = self.apply_delay_pattern_mask(self.token_cache)
            self.on_finalized_audio(audio_values[self.to_yield: -self.stride])
            self.to_yield += len(audio_values) - self.to_yield - self.stride

    def end(self):
        if self.token_cache is not None:
            audio_values = self.apply_delay_pattern_mask(self.token_cache)
        else:
            audio_values = np.zeros(self.to_yield)

        self.on_finalized_audio(audio_values[self.to_yield:], stream_end=True)

    def on_finalized_audio(self, audio: np.ndarray, stream_end: bool = False):
        self.audio_queue.put(audio, timeout=self.timeout)
        if stream_end:
            self.audio_queue.put(self.stop_signal, timeout=self.timeout)

    def __iter__(self):
        return self

    def __next__(self):
        value = self.audio_queue.get(timeout=self.timeout)
        if not isinstance(value, np.ndarray) and value == self.stop_signal:
            raise StopIteration()
        else:
            return value


def index(request):
    return HttpResponse("Hello, world. You're at the musica index.")


def home_data(request):
    start_index = int(request.GET.get('startIndex', 0))
    page_size = int(request.GET.get('pageSize', 3))
    songs = Song.objects.all()[start_index:start_index+page_size]
    data = [{"id": song.id, "title": song.title, "url": song.url} for song in songs]
    return JsonResponse({"data": data}, safe=True)


@csrf_exempt
def music_generation(request):
    if request.method == 'POST':
        description = request.POST.get('description', '')
        lyrics = request.POST.get('lyrics', '')
        style = request.POST.get('style', '')
        title = request.POST.get('title', '')
        audio_length_in_s = float(request.POST.get('audio_length', 15.0))
        play_steps_in_s = float(request.POST.get('play_steps', 1.5))
        seed = int(request.POST.get('seed', 0))

        device = "cuda:0" if torch.cuda.is_available() else "cpu"
        if device != model.device:
            model.to(device)
            if device == "cuda:0":
                model.half()

        max_new_tokens = int(model.config.frame_rate * audio_length_in_s)
        play_steps = int(model.config.frame_rate * play_steps_in_s)

        inputs = processor(
            text=f"{style} {title}: {description}",
            padding=True,
            return_tensors="pt",
        )

        streamer = MusicgenStreamer(model, device=device, play_steps=play_steps)

        def generate_audio():
            torch.manual_seed(seed)
            model.generate(
                **inputs.to(device),
                streamer=streamer,
                max_new_tokens=max_new_tokens,
            )

        thread = Thread(target=generate_audio)
        thread.start()
        
        def generate_thumbnail(description, seed):
            if pipe is not None:
                image = pipe(description, num_inference_steps=50, guidance_scale=7.5, seed=seed).images[0]
                buffered = BytesIO()
                image.save(buffered, format="JPEG")
                img_str = base64.b64encode(buffered.getvalue()).decode()
                return img_str
            else:
                return None  # Or a default image URL

        # Generate thumbnail in a separate thread
        thumbnail_thread = Thread(target=generate_thumbnail, args=(description, seed))
        thumbnail_thread.start()

        def audio_stream():
            for new_audio in streamer:
                yield new_audio.tobytes()

        response = StreamingHttpResponse(audio_stream(), content_type="audio/wav")
        return response
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def lyrics_generation(request):
    if request.method == 'POST':
        prompt = request.POST.get('prompt', 'Write lyrics for a song')

        payload = {
            "model": "llama32-musica-lyric",
            "prompt": f"Generate lyrics for a song about: {prompt}",
            "max_tokens": 2000,
            "temperature": 0.7
        }

        headers = {
            'Authorization': f"Bearer {settings.OLLAMA_API_KEY}",
            'Content-Type': 'application/json',
        }

        response = requests.post('https://api.ollama.com/v1/completions', headers=headers, data=json.dumps(payload))

        if response.status_code == 200:
            data = response.json()
            lyrics = data['choices'][0]['text'].strip()

            lyrics_obj = Lyrics.objects.create(prompt=prompt, content=lyrics)

            return JsonResponse({"lyrics": lyrics, "id": lyrics_obj.id}, safe=True)
        else:
            return JsonResponse({"error": "Failed to generate lyrics"}, status=response.status_code)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


def list_songs(request):
    page = request.GET.get('page', 1)
    page_size = request.GET.get('page_size', 10)

    try:
        page = int(page)
        page_size = int(page_size)
    except ValueError:
        return JsonResponse({"error": "Invalid page or page_size parameter"}, status=400)

    if page < 1 or page_size < 1:
        return JsonResponse({"error": "Page and page_size must be positive integers"}, status=400)

    songs = Song.objects.all().order_by('-id')
    paginator = Paginator(songs, page_size)

    try:
        songs_page = paginator.page(page)
    except EmptyPage:
        return JsonResponse({"error": "Page not found"}, status=404)

    data = [{
        "id": song.id,
        "title": song.title,
        "description": song.description,
        "style": song.style,
        "url": song.url
    } for song in songs_page]

    return JsonResponse({
        "data": data,
        "total_pages": paginator.num_pages,
        "current_page": page,
        "total_songs": paginator.count
    }, safe=True)


def song_details(request, song_id):
    try:
        song_id = int(song_id)
    except ValueError:
        return JsonResponse({"error": "Invalid song ID"}, status=400)

    try:
        song = Song.objects.get(id=song_id)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Song not found"}, status=404)

    try:
        song.full_clean()
    except ValidationError as e:
        return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({
        "id": song.id,
        "title": song.title,
        "description": song.description,
        "style": song.style,
        "url": song.url
    }, safe=True)


def save_audio(audio_tensor):

    audio_numpy = audio_tensor.cpu().numpy()

    audio_dir = os.path.join(settings.MEDIA_ROOT, 'generated_audio')
    os.makedirs(audio_dir, exist_ok=True)

    filename = f"audio_{uuid.uuid4().hex[:10]}.wav"
    file_path = os.path.join(audio_dir, filename)

    sf.write(file_path, audio_numpy, samplerate=32000)

    audio_url = settings.MEDIA_URL + f'generated_audio/{filename}'

    return audio_url
