import React from "react";

export const CustomBtn = () => {
    return (
        <div className="w-fit px-4 h-full relative flex items-center justify-center text-white gap-2 group rounded-full overflow-hidden cursor-pointer opacity-90 group-hover:opacity-100 transition-all">
            <img src="/static/images/button-background.svg" alt="plus" className="absolute top-0 left-0 group-hover:[animation:_move_1s_infinite] scale-150 h-full object-cover transition-all z-0" />
            <img src="/static/images/grain.png" alt="plus" className="absolute top-0 left-0 h-full object-coverz-1" />
            <svg xmlns="http://www.w3.org/2000/svg" className="z-50 w-16 md:w-14 h-16 md:h-14" viewBox="0 0 21 20" fill="none">
                <path d="m14.637.5 1.112.002.272-.002.04.163c.186.779.363 1.517.983 2.13.657.652 1.614.968 2.456 1.169v1.385c-.853.2-1.68.51-2.345 1.167-.663.655-.932 1.454-1.134 2.295l-1.112-.002-.272.002-.04-.163c-.186-.78-.362-1.517-.982-2.13-.658-.652-1.598-.968-2.44-1.17V3.963c.853-.2 1.663-.51 2.328-1.167.663-.655.932-1.454 1.134-2.295m-9 6.231 4.154-.693.531.097c.961.23 1.896.563 2.52 1.181.447.443.65.954.825 1.61L7.02 10.195v4.846c0 .347-.025.97-.077 1.128-.165.794-.907 1.598-1.971 2.027-1.54.622-2.967.253-3.372-.75s.448-2.293 1.905-2.882c.749-.302 1.511-.36 2.13-.21zm10.385 7.27v-3.808h-1.385v2.952c-.633-.175-1.428-.125-2.207.19-1.458.589-2.311 1.879-1.906 2.882s1.914 1.34 3.372.75c1.087-.438 1.78-1.235 1.981-2.078l.012-.047c.04-.16.132-.531.133-.841" fill="#FAF7F5" />
            </svg>
            <p className="text-nowrap z-50 hidden md:block">Create a song</p>
            <p className="text-nowrap z-50 block md:hidden">Create</p>
        </div>
    );
};

const Songlist = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row flex-nowrap items-center md:items-end justify-start md:justify-between">
                <h1 className="text-3xl text-bold text-gray-300">Make your own song with a Click</h1>
                <p className="text-gray-400">(You'll need to sign-up for a free account)</p>
            </div>
            <div className="mt-5 md:mt-10 h-16 p-2 rounded-full flex flex-nowrap items-center justify-between border-gray-500 bg-gray-900/60 border-2">
                <input type="text" placeholder="A house techno banger for a party" className="py-4 px-4 h-full w-full bg-transparent" />
                <CustomBtn />
            </div>
        </div>
    );
};

export default Songlist;
