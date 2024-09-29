import React, { useEffect, useState } from "react";
import { activeSongAtom } from "../Variables";
import { useAtom } from "jotai";
const Player = () => {
    const [randomBackground, setRandomBackground] = useState(1);
    const [songData, setSongData] = useAtom(activeSongAtom);
    useEffect(() => {
        setRandomBackground(Math.floor(Math.random() * 11) + 1);
    }, []);
    return (
        <div className="md:hidden md:w-[0%] lg:block lg:w-[20%] h-screen relative overflow-hidden">
            <div className="absolute top-0 left-0 rounded-r-3xl w-5 h-screen bg-gray-800 z-50 shadow-xl"></div>
            <img src={"/static/images/aura/Aura (" + randomBackground + ").jpg"} alt="song" className="absolute top-0 left-0 w-full h-full object-cover" />
            <div className="bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent from-0% via-60% w-full min-h-[calc(100%-128px)] h-auto object-cover absolute top-32 flex items-start justify-center" />
            {songData?.title !== "" && (
                <div className="w-full h-screen overflow-y-scroll hidden lg:block noScrollbars bg-gray-600 z-40 absolute top-0 left-0 pl-5 ">
                    <button
                        onClick={() => {
                            setSongData({ img: "", title: "", tag: "", lyrics: "", audio: "", duration: "" });
                        }}
                        className="absolute top-3 right-3 z-50 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-300/30 backdrop-blur-xl transition-all duration-300 p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="stroke-white h-4 w-4" fill="currentColor" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="overflow-y-auto h-full overflow-x-hidden bg-gray-600 noScrollbars">
                        <div className="relative overflow-hidden mb-4 cursor-pointer w-full aspect-[232/280] border-vinylBlack-darker">
                            <img alt="Image for Unspoken" src={songData?.img} loading="lazy" className="absolute inset-0 w-[90%] h-[90%] mt-5 mx-auto rounded-xl object-cover " />
                        </div>
                        <div className="px-5">
                            <span className="mt-2 font-sans text-white text-xl font-normal" title="Unspoken">
                                <a className="chakra-link css-spn4bz" href="#">
                                    {songData?.title}
                                </a>
                            </span>
                            <span className="px-5 text-gray-400 text-sm">
                                <p>{songData?.tag}</p>
                            </span>
                            <div className="py-2">
                                <div className="flex items-center justify-start gap-5">
                                    <button>
                                        <svg className="text-white h-5 w-5 hover:bg-gray-300/25 rounded-full p-1 scale-125" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M7.5 1.11562V0H10.5V1.11562C10.5 2.30625 10.2188 3.4625 9.69375 4.5H14.5H16V7.5H15.5V10H14.75V12.25H14V14H12.5H8.75H8.29688L7.91875 13.7469L5.66875 12.2469L5 11.8031V11V9V6V5.27812L5.5625 4.82812L5.80937 4.62813C6.87812 3.775 7.49687 2.48125 7.49687 1.11562H7.5ZM4 5V14H0V5H4Z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <svg className="text-white h-5 w-5 hover:bg-gray-300/25 rounded-full p-1 scale-125" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M8.5 13.8844L8.5 15L5.5 15L5.5 13.8844C5.5 12.6938 5.78125 11.5375 6.30625 10.5L1.5 10.5L-5.60272e-07 10.5L-2.98003e-07 7.5L0.5 7.5L0.5 5L1.25 5L1.25 2.75L2 2.75L2 1L3.5 1L7.25 1L7.70313 1L8.08125 1.25313L10.3313 2.75313L11 3.19688L11 4L11 6L11 9L11 9.72188L10.4375 10.1719L10.1906 10.3719C9.12187 11.225 8.50312 12.5188 8.50312 13.8844L8.5 13.8844ZM12 10L12 1L16 1L16 10L12 10Z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <svg className="text-white h-5 w-5 hover:bg-gray-300/25 rounded-full p-1 scale-125" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M11.5556 10.25H10.6667V7.625H10.2222H9.73611C8.28611 7.625 7.11111 8.78164 7.11111 10.209C7.11111 11.2836 8 12 8 12C8 12 4.44444 10.9254 4.44444 8.0625C4.44444 5.88867 6.23611 4.125 8.44444 4.125H10.6667V1.5H11.5556L16 5.875L11.5556 10.25ZM0 2.375H0.888889H3.55556H4.44444V4.125H3.55556H1.77778V13.75H11.5556V12.875V12H13.3333V12.875V14.625V15.5H12.4444H0.888889H0V14.625V3.25V2.375Z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <svg className="text-white h-5 w-5 hover:bg-gray-300/25 rounded-full p-1 scale-125" viewBox="0 0 4 13" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M0.5 0H3.5V3H0.5V0ZM0.5 5H3.5V8H0.5V5ZM3.5 10V13H0.5V10H3.5Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 mb-4 font-sans font-normal text-gray-300 text-md">
                                {songData?.lyrics.split("\n").map((line, index) => {
                                    if (line === "") {
                                        return <br key={index} />;
                                    }
                                    return (
                                        <p key={index} className="font-sans font-normal text-md">
                                            {line.replace(/suno/g, "musica")}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Player;
