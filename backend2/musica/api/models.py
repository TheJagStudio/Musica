from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    image = models.URLField(blank=True)
    display_name = models.CharField(max_length=255)

    def __str__(self):
        return self.display_name or self.username


class Song(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    instrumental = models.BooleanField(default=False)
    tags = models.JSONField(null=True, blank=True)
    prompt = models.TextField(null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    duration = models.FloatField(null=True, blank=True)
    public = models.BooleanField(default=False)
    favorite_num = models.IntegerField(default=0)
    download_num = models.IntegerField(default=0)
    share_num = models.IntegerField(default=0)
    play_num = models.IntegerField(default=0)
    upvote_num = models.IntegerField(default=0)
    step_num = models.IntegerField(default=0)
    audio_location = models.URLField(null=True, blank=True)
    image_location = models.URLField(null=True, blank=True)
    waveform = models.JSONField(null=True, blank=True)
    waveform_url = models.URLField(null=True, blank=True)
    generate_id = models.IntegerField()
    created_date = models.DateTimeField()
    type = models.CharField(max_length=50)
    image_url = models.URLField()
    audio_url = models.URLField()
    lyric = models.TextField()
    msg = models.TextField(null=True, blank=True)
    try_again = models.BooleanField(default=True)

    def __str__(self):
        return self.title or f"Song {self.id}"


class MusicGenerateRecord(models.Model):
    id = models.IntegerField(primary_key=True)
    prompt = models.TextField(null=True, blank=True)
    style = models.CharField(max_length=100, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField()
    instrumental = models.BooleanField(default=False)
    music = models.ForeignKey(Song, on_delete=models.CASCADE, related_name='generate_records', null=True, blank=True)
    retry_num = models.IntegerField(null=True, blank=True)
    msg = models.TextField(null=True, blank=True)
    lyric = models.TextField()

    def __str__(self):
        return f"Generate Record {self.id} for {self.title or 'Untitled'}"
