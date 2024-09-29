import React from "react";
import { Outlet } from "react-router-dom";
import Player from "../components/Player";
import Sidebar from "../Components/Sidebar";
import AudioPlayer from "../Components/AudioPlayer";
import { activeSongAtom } from "../Variables";
import { useAtom } from "jotai";
const UserLayout = () => {
    const [activeSong, setActiveSong] = useAtom(activeSongAtom);
    return (
        <div className="bg-gray-800 w-full h-screen flex">
            <Sidebar />
            <div className="relative py-10 px-5 md:pl-10 w-full sm:w-[80%] lg:w-[70%] flex flex-col overflow-y-auto noScrollbars">
                <Outlet />
                {activeSong?.title !== "" && (
                    <div className="fixed bottom-20 md:bottom-3 rounded-t-lg md:rounded-lg w-[94%] left-[2.6%] sm:w-[85%] sm:left-[15%] lg:left-[14.5%] lg:w-[68%]  z-[60] bg-slate-600/80 backdrop-blur-xl">
                        <AudioPlayer />
                    </div>
                )}
            </div>
            <Player />
        </div>
    );
};

export default UserLayout;
