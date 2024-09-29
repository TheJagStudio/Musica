import React,{useEffect, useRef,useState} from "react";
import { activeSongAtom } from "../Variables";
import { useAtom } from "jotai";
const AudioPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const [percentageCompleted, setPercentageCompleted] = useState(0);
    const [activeSong, setActiveSong] = useAtom(activeSongAtom);
    const audioRef = useRef(null);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlaying(false);
        }
        setPercentageCompleted(0);
        // audioRef.current.load();
        // audioRef.current.play();
        // setPlaying(true);
    }, [activeSong]);
    return (
        <div className="flex flex-row flex-1 content-between items-center p-2 text-white relative">
            <div className="absolute bottom-0 left-0 h-1 bg-white z-50" style={{width:percentageCompleted+"%"}}>
                </div>
            <div className="w-full md:w-8 overflow-hidden flex flex-1 items-center relative">
                <img alt="Cover image for Savior | Foggy X" src={activeSong?.img} loading="lazy" className="rounded-md w-10 h-16 md:h-14 mr-2 object-cover cursor-pointer" />
                <div className="md:w-auto w-full relative flex flex-col pr-2">
                    <div className="relative w-fit flex overflow-x-hidden text-sm font-medium hover:underline cursor-pointer">
                        <div className="animate-marquee md:animate-none">
                            <a className="whitespace-nowrap mr-24" aria-label="Playbar: Title for Savior | Foggy X" href="/song/ea95f437-70e7-46fb-b555-440803029596">
                                {activeSong?.title}
                            </a>
                        </div>
                        <div className="absolute top-0 animate-marquee2 md:animate-none">
                            <a className="whitespace-nowrap mr-24 md:hidden" aria-label="Playbar: Title for Savior | Foggy X" href="/song/ea95f437-70e7-46fb-b555-440803029596">
                                {activeSong?.title}
                            </a>
                        </div>
                        <div className="absolute right-0 w-full bg-gradient-to-r from-transparent via-quaternary md:hidden to-quaternary h-full" />
                    </div>
                    <span className="text-sm font-medium flex flex-col md:flex-row">
                        <p className="relative w-full md:w-fit flex hover:underline">
                            <span className="lg:max-w-[150px] line-clamp-1 w-full">{activeSong?.tag}</span>
                        </p>
                        <span className="text-lightGray mx-2 hidden md:block">|</span>
                        <span className="align-middle whitespace-nowrap hidden md:flex">00:00 / {activeSong?.duration}</span>
                    </span>
                </div>
            </div>
            <button
                onClick={() => {
                    if (audioRef.current.paused) {
                        audioRef.current.play();
                        setPlaying(true);
                    } else {
                        audioRef.current.pause();
                        setPlaying(false);
                    }
                }}
                className="w-7 h-7 flex justify-center outline-none px-[5px] pb-[5px] pt-1 rounded-md"
            >
                {!playing ? (
                    <svg width={10} height={12} viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
                        <path fill="currentColor" d="M10 6L0 0V12L10 6Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width={10} height={12} viewBox="0 0 52 52" className="w-6 h-6 text-white" xmlSpace="preserve">
                        <path fill="currentColor" d="M30 43c0 1 .9 2 2 2h4c1.1 0 2-1.1 2-2V9c0-1-.9-2-2-2h-4c-1.1 0-2 1.1-2 2zm-16 0c0 1 .9 2 2 2h4c1.1 0 2-1.1 2-2V9c0-1-.9-2-2-2h-4c-1.1 0-2 1.1-2 2z" />
                    </svg>
                )}
            </button>
            <audio ref={audioRef} src={activeSong?.audio} onPlayingCapture={()=>{
                setInterval(() => {
                    setPercentageCompleted((audioRef.current.currentTime / audioRef.current.duration) * 100);
                }, 100);
            }} onPauseCapture={()=>{
                clearInterval();
            }} className="hidden" />
        </div>
    );
};

export default AudioPlayer;
