import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
const Sidebar = () => {
    const [currentPage, setCurrentPage] = useState("home");
    useEffect(() => {
        if (window.location.pathname == "/") {
            setCurrentPage("home");
        } else if (window.location.pathname == "/create") {
            setCurrentPage("create");
        } else if (window.location.pathname == "/library") {
            setCurrentPage("library");
        } 
    }, [currentPage]);
    return (
        <div className="text-white py-10 md:px-5 fixed bottom-0 left-0 z-50 md:relative flex flex-row md:flex-col items-center justify-between h-20 md:h-screen w-screen md:w-[15%] bg-gray-900 rounded-t-2xl md:rounded-tl-none md:rounded-r-3xl shadow-xl">
            <div className="flex flex-row md:flex-col w-full">
                <Player autoplay loop src="/static/json/disco.json" className="w-full relative z-50">
                    <div className="h-16 w-2 bg-gradient-to-r from-logo to-gray-900 absolute top-0 left-1/2 -translate-x-1/2 z-1"></div>
                </Player>
                {/* <h1 className="text-3xl font-bold text-logo hidden md:block text-center">müsica</h1> */}
                <img src="/static/images/logo.png" alt="logo" className="w-full h-16 mx-auto md:mx-0" />
                <ul className="flex flex-row px-2 md:px-0 md:flex-col mx-auto md:mx-0 w-full md:mt-10 items-center md:items-start justify-center md:justify-normal">
                    <Link
                        onClick={() => {
                            setCurrentPage("home");
                        }}
                        to={"/"}
                        className={"p-3 cursor-pointer hover:bg-logo/20 hover:border-logo rounded-lg md:rounded-none md:border-l-4 w-full " + (currentPage === "home" ? "border-logo bg-logo/20" : "border-transparent")}
                    >
                        Home
                    </Link>
                    <Link
                        onClick={() => {
                            setCurrentPage("create");
                        }}
                        to={"/create"}
                        className={"p-3 cursor-pointer hover:bg-logo/20 hover:border-logo rounded-lg md:rounded-none md:border-l-4 w-full " + (currentPage === "create" ? "border-logo bg-logo/20" : "border-transparent")}
                    >
                        Create
                    </Link>
                    <Link
                        onClick={() => {
                            setCurrentPage("library");
                        }}
                        to={"/library"}
                        className={"p-3 cursor-pointer hover:bg-logo/20 hover:border-logo rounded-lg md:rounded-none md:border-l-4 w-full " + (currentPage === "library" ? "border-logo bg-logo/20" : "border-transparent")}
                    >
                        Library
                    </Link>
                </ul>
            </div>
            <button className="hidden md:block bg-gradient-to-tr from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-700 w-[80%] py-3 rounded-lg hover:border-gray-500 border-4 border-gray-700 ">Sign In</button>
        </div>
    );
};

export default Sidebar;
