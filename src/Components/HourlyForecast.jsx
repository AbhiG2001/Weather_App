import React, { useRef } from "react";
import img from "../images/img.png";
import "./HourlyForecast.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HourlyForecast = ({hourlyData}) => {
  const scrollRef = useRef(null); //Referance to the scrollbar container

  // scroll functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  return (
    <div className="relative mt-6">
      <div
        ref={scrollRef}
        className="flex gap-4 mx-10 py-2 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center shadow-lg hover:bg-green-200 bg-green-100 gap-3 py-2 rounded px-4"
          >
            <p className="text-blue-700">{new Date(hour.time).getHours()}:00</p>
            <img
              src={hour.condition.icon}
              alt="Weather icon"
              className="w-15 mx-auto h-15"
            />
            <p>{hour.temp_c}°C</p>
          </div>
        ))}
        {/* one hour */}

        {/* <div className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4">
          <p className="text-blue-800" >14:00</p>
          <img src={img} alt="Weather icon" className="w-10 mx-auto" />
          <p>5°C</p>
        </div>
        <div className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 gap-4">
          <p className="text-blue-800">14:00</p>
          <img src={img} alt="Weather icon" className="w-10 mx-auto" />
          <p>5°C</p>
        </div>
        <div className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 gap-4">
          <p className="text-blue-800">14:00</p>
          <img src={img} alt="Weather icon" className="w-10 mx-auto" />
          <p>5°C</p>
        </div>
        <div className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 gap-4">
          <p className="text-blue-800">14:00</p>
          <img src={img} alt="Weather icon" className="w-10 mx-auto" />
          <p>5°C</p>
        </div>
        <div className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 gap-4">
          <p className="text-blue-800" >14:00</p>
          <img src={img} alt="Weather icon" className=" w-10 mx-auto" />
          <p className="">5°C</p>
        </div> */}
      </div>
      {/* scroll button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 bg-green-500 hover:bg-green-800 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center "
      >
        <FaChevronLeft className="w-4" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 bg-green-500 hover:bg-green-800 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <FaChevronRight className="w-4" />
      </button>
    </div>
  );
};

export default HourlyForecast;
