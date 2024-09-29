import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { activeSongAtom } from "../Variables";
import { useAtom } from "jotai";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const SongCard = ({ key,data }) => {
    const [activeSong, setActiveSong] = useAtom(activeSongAtom);
    let totalSeconds = data?.metadata?.duration;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.round(totalSeconds % 60);

    // Pad the seconds with a zero if it's less than 10
    let paddedSeconds = seconds < 10 ? "0" + seconds : seconds;

    let duration = `${minutes}:${paddedSeconds}`;
    return (
        <div onClick={()=>{
            setActiveSong({ img: data?.image_url !== undefined ? data?.image_url : data?.image_large_url, title: data?.display_name, tag: data?.metadata?.tags, lyrics: data?.metadata?.prompt, audio: data?.audio_url, duration: duration });
        }} key={key} className="relative flex flex-col w-[160px] flex-shrink-0 overflow-hidden group cursor-pointer">
            <div className="relative mb-4 cursor-pointer">
                <div className="relative overflow-hidden rounded-xl h-60 w-full border-2 border-vinylBlack-darker">
                    <img alt="Image for Buffering... Please Wait" src={data?.image_url !== undefined ? data?.image_url : data?.image_large_url} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden absolute inset-0">
                    <button className="flex items-center justify-center rounded-full p-4 w-14 h-14 backdrop-blur-lg bg-black/50 text-current border-none outline-none absolute top-1.5 end-1.5 transition[transform,opacity] duration-150 -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="currentColor">
                            <path d="M32.16 16.08 8.94 4.47A2.07 2.07 0 0 0 6 6.32v23.21a2.06 2.06 0 0 0 3 1.85l23.16-11.61a2.07 2.07 0 0 0 0-3.7Z" />
                            <path fill="none" d="M0 0h36v36H0z" />
                        </svg>
                    </button>
                    <div className="absolute inset-x-2 bottom-2 flex flex-row gap-1">
                        <button aria-label="Play button with play count" className="flex-row items-center gap-1 rounded-md px-2 py-1 font-mono font-bold text-xs text-white backdrop-blur-lg bg-black/50 shadow-lg inline-flex w-auto hover:bg-gray-800/30">
                            <div>
                                <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="currentColor">
                                    <path d="M32.16 16.08 8.94 4.47A2.07 2.07 0 0 0 6 6.32v23.21a2.06 2.06 0 0 0 3 1.85l23.16-11.61a2.07 2.07 0 0 0 0-3.7Z" />
                                    <path fill="none" d="M0 0h36v36H0z" />
                                </svg>
                            </div>
                            <div>{data?.play_count >= 1000 ? Math.round(data?.play_count / 1000) + "K" : data?.play_count}</div>
                        </button>
                        <button aria-label="Like button with like count" className="flex-row items-center gap-1 rounded-md px-2 py-1 font-mono font-bold text-xs text-white backdrop-blur-lg bg-black/50 shadow-lg inline-flex w-auto hover:bg-gray-800/30">
                            <div>
                                <svg width={16} height={14} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="currentColor">
                                    <path d="M7.5 1.11562V0H10.5V1.11562C10.5 2.30625 10.2188 3.4625 9.69375 4.5H14.5H16V7.5H15.5V10H14.75V12.25H14V14H12.5H8.75H8.29688L7.91875 13.7469L5.66875 12.2469L5 11.8031V11V9V6V5.27812L5.5625 4.82812L5.80937 4.62813C6.87812 3.775 7.49687 2.48125 7.49687 1.11562H7.5ZM4 5V14H0V5H4Z" />
                                </svg>
                            </div>
                            <div>{data?.upvote_count >= 1000 ? Math.round(data?.upvote_count / 1000) + "K" : data?.upvote_count}</div>
                        </button>
                    </div>
                    <div className="absolute inset-x-2 top-2">
                        <div className="flex-row items-center gap-1 rounded-md px-2 py-1 font-mono font-bold text-xs text-white backdrop-blur-lg bg-black/50 shadow-lg inline-flex w-auto">
                            <div>{duration}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="text-base font-medium font-sans text-white line-clamp-1 w-full hover:underline cursor-pointer">
                    <a title={data?.display_name} href="#">
                        {data?.display_name}
                    </a>
                </div>
                <div className="line-clamp-1 mb-1 text-sm text-gray-500" title={data?.metadata?.tags}>
                    <div className="line-clamp-1 flex-nowrap font-sans break-all text-sm text-gray-500 mr-1">
                        <p>{data?.metadata?.tags}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Trending({ title, items,key }) {
    return (
        <div key={key}>
            <h1 className="mt-5 md:mt-10 text-white text-2xl">{title.replace(/Suno/g, "Musica")}</h1>
            <div className="w-full flex mt-3 gap-5">
                <Swiper
                    autoplay={{
                        delay: key % 2 == 0 ? 2500 : 1500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        360: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 50,
                        },
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={5}
                >
                    {items?.map((item, index) => (
                        <SwiperSlide>
                            <SongCard key={index} data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Trending;
