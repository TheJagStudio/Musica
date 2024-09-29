import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const CatagoryCard = ({ data, key }) => {
    return (
        <a key={key} className="w-full flex flex-col items-center group" href="#">
            <div className="rounded-xl overflow-hidden h-32 w-32 z-1 transition duration-300 ease-in-out relative">
                <div className="w-full h-full hue-rotate-30" style={{ backgroundImage: "url(" + data?.image_url + ")",filter: "blur(8px) hue-rotate(30deg)" }} />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="absolute inset-0 bg-black transition-opacity bg-opacity-60 group-hover:bg-opacity-70 transition-group-opacity duration-1000 ease-in-out" />{" "}
            </div>
            <div className="rounded-xl overflow-hidden h-36 w-36 -mt-[120px] shadow-[0px_-2px_2px_rgba(0,0,0,0.5)] z-2 transition duration-300 ease-in-out group-hover:-translate-y-2 relative">
                <div className="w-full h-full hue-rotate-60" style={{ backgroundImage: "url(" + data?.image_url + ")",filter: "blur(8px) hue-rotate(60deg)" }} />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="rounded-xl overflow-hidden h-40 w-40 -mt-[130px] mb-4 shadow-[0px_-2px_2px_rgba(0,0,0,0.5)] z-3 transition-transform duration-300 ease-in-out group-hover:-translate-y-3 relative">
                <button aria-label="Like playlist button" className="rounded-md backdrop-blur-lg flex flex-row text-[10px] bg-black/50 text-white gap-1 items-center px-2 py-1 font-mono font-bold shadow-lg hover:bg-gray-800/30 absolute bottom-2 left-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none" webcrx="">
                        <path d="M7.5 1.11562V0H10.5V1.11562C10.5 2.30625 10.2188 3.4625 9.69375 4.5H14.5H16V7.5H15.5V10H14.75V12.25H14V14H12.5H8.75H8.29688L7.91875 13.7469L5.66875 12.2469L5 11.8031V11V9V6V5.27812L5.5625 4.82812L5.80937 4.62813C6.87812 3.775 7.49687 2.48125 7.49687 1.11562H7.5ZM4 5V14H0V5H4Z" fill="#FAF7F5" />
                    </svg>
                    {data?.upvote_count >= 1000 ? Math.round(data?.upvote_count / 1000) + "K" : data?.upvote_count}
                </button>
                <img alt="Image for Cat Covers" src={data?.image_url !== undefined ? data?.image_url : data?.image_large_url} loading="lazy" className="object-cover h-40 w-40" />
            </div>
        </a>
    );
};

function Catagories({ title, items, key }) {
    if (title !== "Playlists For You") {
        return (
            <div key={key}>
                <h1 className="mt-5 md:mt-10 text-white text-2xl">{title.replace(/Suno/g, "Musica")}</h1>
                <div className="w-full flex gap-5 mt-3">
                    <Swiper
                        autoplay={{
                            delay: (key % 2 == 0 ? 2500 : 1500),
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
                        {items.map((item, index) => {
                            if (item?.image_url !== undefined) {
                                return (
                                    <SwiperSlide key={index}>
                                        <CatagoryCard data={item} key={index} />
                                    </SwiperSlide>
                                );
                            }
                        })}
                    </Swiper>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}

export default Catagories;
