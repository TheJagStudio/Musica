import React, { useEffect, useState } from "react";
import { activeSongAtom } from "../Variables";
import { useAtom } from "jotai";
import { WaveformVisualizer, WaveformVisualizerTheme } from "react-audio-visualizers";

const Create = () => {
	const [activeSong, setActiveSong] = useAtom(activeSongAtom);
    const [description, setDescription] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [style, setStyle] = useState("");
    const [title, setTitle] = useState("");
    const [songData, setSongData] = useState({ status: "" });
    const [songList, setSongList] = useState([]);
	const [tempSongList, setTempSongList] = useState([]);
    const [advanceFeature, setAdvanceFeature] = useState(false);
    useEffect(() => {
        setLyrics("");
        setStyle("");
        setTitle("");
    }, [advanceFeature]);
    useEffect(() => {
        if (localStorage.getItem("songList")) {
            setSongList(JSON.parse(localStorage.getItem("songList")));
        }
    }, []);
    
    return (
        <div className="flex flex-col gap-5 md:flex-row items-center justify-between w-full ">
            <div className="w-full md:w-[30%] h-fit md:h-screen">
                <div className="flex items-center justify-start">
                    <p className="text-white">Song Discription</p>
                    <button className="relative p-1 rounded-full focus:outline-none text-white/80 group cursor-pointer">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height={12} width={12} xmlns="http://www.w3.org/2000/svg">
                            <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
                        </svg>
                        <div className="absolute z-10 w-48 p-2 origin-top-left scale-0 group-hover:scale-100 transition-all text-white bg-gray-700 rounded shadow-lg left-2 top-5 text-sm border border-white border-opacity-20">Describe the style of music and topic you want (e.g. acoustic pop about the holidays). Use genres and vibes instead of specific artists and songs.</div>
                    </button>
                </div>
                <div className="relative p-4 pb-5 pr-0 mt-2 rounded-lg border border-white border-opacity-20 hover:border-opacity-30 overflow-hidden flex-1 bg-gray-700">
                    <textarea id="description" onChange={setDescription} defaultValue={description} maxLength={200} placeholder="a dreamy anime song about finding love on a rainy day" className="w-full p-0 pb-4 text-white focus:outline-none font-sans text-sm placeholder-opacity-70 bg-transparent" />
                    <div className="font-sans absolute bottom-2 right-2 text-gray-400 text-sm">{description?.length} / 200</div>
                </div>
                <div
                    onClick={() => {
                        let formData = new FormData();
                        let tempDescription = document.getElementById("description").value;
                        let tempLyrics = document.getElementById("lyrics")?.value;
                        let tempStyle = document.getElementById("style")?.value;
                        let tempTitle = document.getElementById("title")?.value;

                        if (tempDescription === "" || (tempLyrics === "" && advanceFeature) || (tempStyle === "" && advanceFeature) || (tempTitle === "" && advanceFeature)) {
                            alert("Please enter all the required fields.");
                            return;
                        }
                        formData.append("description", tempDescription);
                        formData.append("lyrics", tempLyrics);
                        formData.append("style", tempStyle);
                        formData.append("title", tempTitle);
                        fetch(import.meta.env.VITE_BACKEND_URL + "/api/music-generation/", {
                            method: "POST",
                            body: formData,
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                setSongData(data);
                                window.MainInterval = setInterval(() => {
                                    fetch(import.meta.env.VITE_BACKEND_URL + "/api/song-details-fetch/?song1=" + data.song1 + "&song2=" + data.song2)
                                        .then((res) => res.json())
                                        .then((data) => {
                                            console.log(data.data);
                                            setTempSongList(data.data);
                                            let flag = 0;
                                            for (let i = 0; i < data.data.length; i++) {
                                                if (data.data[i].audioUrl !== null) {
                                                    flag = flag + 1;
                                                }
                                            }
                                            if (flag === 2) {
                                                clearInterval(window.MainInterval);
                                                setSongList([...songList, ...data.data]);
                                                localStorage.setItem("songList", JSON.stringify([...songList, ...data.data]));
                                                setTempSongList([]);
                                            }
                                        })
                                        .catch((err) => console.log(err));
                                }, 5000);
                            })
                            .catch((err) => console.log(err));
                    }}
                    className="w-full mt-3 px-4 h-10 relative flex items-center justify-center text-white gap-2 group rounded-full overflow-hidden cursor-pointer opacity-90 group-hover:opacity-100 transition-all"
                >
                    <img src="/static/images/button-background.svg" alt="plus" className="absolute top-0 w-full left-0 group-hover:[animation:_move_1s_infinite] scale-150 h-full object-cover transition-all z-0" />
                    <img src="/static/images/grain.png" alt="plus" className="absolute top-0 left-0 w-full h-full object-cover z-1" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="z-50 w-8 h-8" viewBox="0 0 21 20" fill="none">
                        <path d="m14.637.5 1.112.002.272-.002.04.163c.186.779.363 1.517.983 2.13.657.652 1.614.968 2.456 1.169v1.385c-.853.2-1.68.51-2.345 1.167-.663.655-.932 1.454-1.134 2.295l-1.112-.002-.272.002-.04-.163c-.186-.78-.362-1.517-.982-2.13-.658-.652-1.598-.968-2.44-1.17V3.963c.853-.2 1.663-.51 2.328-1.167.663-.655.932-1.454 1.134-2.295m-9 6.231 4.154-.693.531.097c.961.23 1.896.563 2.52 1.181.447.443.65.954.825 1.61L7.02 10.195v4.846c0 .347-.025.97-.077 1.128-.165.794-.907 1.598-1.971 2.027-1.54.622-2.967.253-3.372-.75s.448-2.293 1.905-2.882c.749-.302 1.511-.36 2.13-.21zm10.385 7.27v-3.808h-1.385v2.952c-.633-.175-1.428-.125-2.207.19-1.458.589-2.311 1.879-1.906 2.882s1.914 1.34 3.372.75c1.087-.438 1.78-1.235 1.981-2.078l.012-.047c.04-.16.132-.531.133-.841" fill="#FAF7F5" />
                    </svg>
                    <p className="text-nowrap z-50 font-semibold">Create</p>
                </div>
                <button
                    onClick={() => {
                        setAdvanceFeature(!advanceFeature);
                    }}
                    className="flex flex-nowrap gap-1 items-center justify-start mt-3 text-white"
                >
                    <p>Advance Feature</p>
                    <svg width={24} height={24} className={(!advanceFeature ? "rotate-180 " : " ") + "transition-all"} viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                            <path d="M.72 0v.72H0V0zM.378.698.376.699H.375L.373.698H.372L.371.711v.001l.003.002.003-.002V.711L.376.698.375.697M.383.694.377.697.378.71l.006.003h.001L.384.695zm-.021 0H.361L.36.712l.001.001L.367.71.368.697z" />
                            <path d="M.328.238a.045.045 0 0 1 .064 0l.17.17a.045.045 0 1 1-.064.064L.36.334.222.472A.045.045 0 1 1 .158.408z" fill="currentColor" />
                        </g>
                    </svg>
                </button>
                {advanceFeature && (
                    <div className="mt-3">
                        <p className="text-white">Lyrics</p>
                        <div className="relative p-4 pb-5 pr-0 mt-2 rounded-lg border border-white border-opacity-20 hover:border-opacity-30 overflow-hidden flex-1 bg-gray-700">
                            <textarea id="lyrics" onChange={setLyrics} defaultValue={lyrics} maxLength={2500} placeholder="" className="w-full h-32 p-0 pb-4 text-white focus:outline-none font-sans text-sm placeholder-opacity-70 bg-transparent" />
                            <div>
                                <div
                                    onClick={() => {
                                        let formData = new FormData();
                                        let tempLyrics = document.getElementById("lyrics").value;
                                        formData.append("prompt", tempLyrics);
                                        fetch(import.meta.env.VITE_BACKEND_URL + "/api/lyrics-generation/", {
                                            method: "POST",
                                            body: formData,
                                        })
                                            .then((res) => res.json())
                                            .then((data) => {
                                                setLyrics(data.lyrics);
                                                document.getElementById("lyrics").value = data.lyrics;
                                            })
                                            .catch((err) => console.log(err));
                                    }}
                                    className="w-fit mt-3 px-2 h-6 absolute bottom-2 left-2 flex items-center justify-center text-white gap-2 group rounded overflow-hidden cursor-pointer opacity-90 group-hover:opacity-100 transition-all"
                                >
                                    <img src="/static/images/button-background.svg" alt="plus" className="absolute saturate-50 -hue-rotate-90 group-hover:saturate-100 top-0 w-full left-0 group-hover:[animation:_move_1s_infinite] scale-150 h-full object-cover transition-all z-0" />
                                    <img src="/static/images/grain.png" alt="plus" className="absolute saturate-50 -hue-rotate-90 group-hover:saturate-100 transition-all top-0 left-0 w-full h-full object-cover z-1" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="z-50 w-5 h-5">
                                        <g fill="white">
                                            <path d="M3.204 3.204a2.4 2.4 0 000 3.398l1.323 1.323c.01-.012.462.42.473.408L8.333 5c.011-.01-.42-.463-.408-.473L6.602 3.204a2.403 2.403 0 00-3.398 0m1.073 9.552a.403.403 0 01.75 0l.131.333a.4.4 0 00.227.228l.332.13a.405.405 0 010 .753l-.332.132a.4.4 0 00-.227.227l-.13.334a.402.402 0 01-.75 0l-.131-.334a.4.4 0 00-.227-.227l-.332-.132a.405.405 0 010-.752l.332-.131a.4.4 0 00.227-.229z" opacity={0.5} />
                                            <path d="M16.64 7.608a.402.402 0 01.75 0l.13.333a.4.4 0 00.227.227l.331.132a.405.405 0 010 .752l-.331.131a.4.4 0 00-.228.228l-.13.333a.403.403 0 01-.75 0l-.13-.333a.4.4 0 00-.227-.228l-.332-.131a.405.405 0 010-.752l.332-.132a.4.4 0 00.226-.227z" opacity={0.2} />
                                            <path d="M13.417 1.923a.402.402 0 01.75 0l.358.912a.4.4 0 00.227.228l.909.36a.405.405 0 010 .753l-.908.36a.4.4 0 00-.228.227l-.358.912a.403.403 0 01-.75 0l-.359-.912a.4.4 0 00-.227-.228l-.908-.36a.405.405 0 010-.752l.908-.36a.4.4 0 00.227-.229z" opacity={0.7} />
                                            <path d="M8.807 5.408c-.01.012-.463-.419-.474-.408L5 8.333c-.01.011.42.464.408.474l7.99 7.989a2.402 2.402 0 103.399-3.398z" />
                                        </g>
                                    </svg>
                                    <p className="text-nowrap z-50">AI Generate</p>
                                </div>
                                <div className="font-sans absolute bottom-2 right-2 text-gray-400 text-sm">{lyrics?.length} / 2500</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-start mt-3">
                            <p className="text-white">Style of Music</p>
                            <button className="relative p-1 rounded-full focus:outline-none text-white/80 group cursor-pointer">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height={12} width={12} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
                                </svg>
                                <div className="absolute z-10 w-48 p-2 origin-top-left scale-0 group-hover:scale-100 transition-all text-white bg-gray-700 rounded shadow-lg left-2 top-5 text-sm border border-white border-opacity-20">Please enter your preferred music style.</div>
                            </button>
                        </div>
                        <div className="relative p-4 pb-5 pr-0 mt-2 rounded-lg border border-white border-opacity-20 hover:border-opacity-30 overflow-hidden flex-1 bg-gray-700">
                            <textarea id="style" onChange={setStyle} defaultValue={style} maxLength={100} placeholder="Enter a music style (e.g., pop, rock, classical, etc.)" className="w-full p-0 pb-4 text-white focus:outline-none font-sans text-sm placeholder-opacity-70 bg-transparent" />
                            <div className="font-sans absolute bottom-2 right-2 text-gray-400 text-sm">{style?.length} / 100</div>
                        </div>
                        <div className="flex items-center justify-start mt-3">
                            <p className="text-white">Title</p>
                            <button className="relative p-1 rounded-full focus:outline-none text-white/80 group cursor-pointer">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height={12} width={12} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
                                </svg>
                                <div className="absolute z-10 w-48 p-2 origin-top-left scale-0 group-hover:scale-100 transition-all text-white bg-gray-700 rounded shadow-lg left-2 top-5 text-sm border border-white border-opacity-20">Personalize your AI-generated song by giving it a unique title!</div>
                            </button>
                        </div>
                        <div className="relative p-4 pb-5 pr-0 mt-2 rounded-lg border border-white border-opacity-20 hover:border-opacity-30 overflow-hidden flex-1 bg-gray-700">
                            <input id="title" onChange={setTitle} defaultValue={title} maxLength={80} placeholder="Enter a memorable title for your song" className="w-full p-0 pb-4 text-white focus:outline-none font-sans text-sm placeholder-opacity-70 bg-transparent" />
                            <div className="font-sans absolute bottom-2 right-2 text-gray-400 text-sm">{title?.length} / 80</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full md:w-[70%] h-fit md:h-screen">
                <div className="flex items-center justify-start mb-2">
                    <p className="text-white">Song Preview</p>
                </div>
                <div className="flex flex-col pb-32">
                    {songList.map((song, index) => (
                        <div
                            onClick={() => {
                                if (song?.audioUrl !== song) {
                                    let totalSeconds = song?.duration;
                                    let minutes = Math.floor(totalSeconds / 60);
                                    let seconds = Math.round(totalSeconds % 60);

                                    // Pad the seconds with a zero if it's less than 10
                                    let paddedSeconds = seconds < 10 ? "0" + seconds : seconds;

                                    let duration = `${minutes}:${paddedSeconds}`;
                                    setActiveSong({ img: song?.imageUrl, title: song?.title, tag: song?.musicGenerateRecord?.style, lyrics: song?.lyric, audio: song?.audioUrl, duration: duration });
                                }
                            }}
                            key={index}
                            className={"flex flex-row items-center justify-between border-t last:border-b p-2 border-gray-700 hover:bg-gray-700 " + (song?.audioUrl === null ? "animate-pulse cursor-not-allowed" : "")}
                        >
                            <div className="flex items-center justify-start">
                                <img src={song?.imageUrl} alt={song?.title} className="w-16 h-16 rounded-lg" />
                                <div className="flex flex-col items-start justify-center ml-3">
                                    <p className="text-white">{song?.title}</p>
                                    <p className="text-white/60">{song?.musicGenerateRecord?.style}</p>
                                </div>
                            </div>
                            <div className="hidden lg:block w-[50%] h-24">
                                <WaveformVisualizer audio={import.meta.env.VITE_BACKEND_URL + "/api/cors-proxy/?url=" + song?.audioUrl} theme={WaveformVisualizerTheme.squaredBars} colors={["#009688", "#26a69a"]} backgroundColor="transparent" barMargin={1} barWidth={3} refreshRate={0.025} />
                            </div>
                        </div>
                    ))}
                    {tempSongList.map((song, index) => (
                        <div
                            onClick={() => {
                                if (song?.audioUrl !== song) {
                                    let totalSeconds = song?.duration;
                                    let minutes = Math.floor(totalSeconds / 60);
                                    let seconds = Math.round(totalSeconds % 60);

                                    // Pad the seconds with a zero if it's less than 10
                                    let paddedSeconds = seconds < 10 ? "0" + seconds : seconds;

                                    let duration = `${minutes}:${paddedSeconds}`;
                                    setActiveSong({ img: song?.imageUrl, title: song?.title, tag: song?.musicGenerateRecord?.style, lyrics: song?.lyric, audio: song?.audioUrl, duration: duration });
                                }
                            }}
                            key={index}
                            className={"flex flex-row items-center justify-between border-t last:border-b p-2 border-gray-700 hover:bg-gray-700 " + (song?.audioUrl === null ? "animate-pulse cursor-not-allowed" : "")}
                        >
                            <div className="flex items-center justify-start">
                                <img src={song?.imageUrl} alt={song?.title} className="w-16 h-16 rounded-lg" />
                                <div className="flex flex-col items-start justify-center ml-3">
                                    <p className="text-white">{song?.title}</p>
                                    <p className="text-white/60">{song?.musicGenerateRecord?.style}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Create;
