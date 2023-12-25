import React from "react";
import Carousel from "./Carousel";

const Banner: React.FC = () => {
  return (
    <div className=" flex h-auto  min-h-[40vh]  w-full flex-col items-center justify-center gap-3 bg-bannerBG  object-center">
      <div className=" mt-16  flex flex-col items-center justify-center gap-3">
        <h1 className=" text-5xl font-bold">
          Crypto <span className="text-yellow-400">Assasin</span>
        </h1>
        <p className=" text-sm text-gray-400">
          Get all the info regarding your favourite crypto currencies
        </p>
      </div>
      <Carousel />
    </div>
  );
};

export default Banner;
