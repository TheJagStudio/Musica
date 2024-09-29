import React, { useEffect, useState } from "react";
import Songlist from "../Components/Songlist";
import Trending from "../Components/Trending";
import Catagories from "../Components/Catagories";
const Home = () => {
    const [homeData, setHomeData] = useState([]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/home-data/")
            .then((res) => res.json())
            .then((data) => {
                setHomeData(data["sections"]);
                setPage(page + data["page_size"]);
            })
            .catch((err) => console.log(err));

    }, []);
    return (
        <>
            <Songlist />
            {homeData?.map((section,index) => {
                if (section["section_type"] === "playlist") {
                    return <Trending title={section?.title} items={section?.items} key={index}/>;
                } else {
                    return <Catagories title={section?.title} items={section?.items} key={index}/>;
                }
            })}
            <button onClick={()=>{
                fetch(import.meta.env.VITE_BACKEND_URL + "/api/home-data/?startIndex=" + page)
                    .then((res) => res.json())
                    .then((data) => {
                        setHomeData([...homeData, ...data["sections"]]);
                        setPage(page + data["page_size"]);
                    })
                    .catch((err) => console.log(err));
            }} className="text-white font-semibold bg-logo w-fit mx-auto mt-3 mb-16 md:mb-0 py-6 px-5 rounded-lg flex flex-nowrap items-center justify-center gap-1 relative overflow-hidden group">
                <img src="/static/images/button-background.svg" alt="plus" className="absolute top-0 left-0 group-hover:[animation:_move_1s_infinite] scale-150 h-full object-cover transition-all z-0 -hue-rotate-90" />
                <img src="/static/images/grain.png" alt="plus" className="absolute top-0 left-0 h-full object-cover z-1" />
                <svg width={20} height={20} className="z-50 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2" />
                </svg>
                <p className="text-white z-50">Show More</p>
            </button>
        </>
    );
};

export default Home;
