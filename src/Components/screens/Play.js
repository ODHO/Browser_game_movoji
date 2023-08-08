import React from "react";
import { Link } from "react-router-dom";

const Play = () => {
  return (
    <div className="bg-[#DDDDDD]">
      <Link to="/Switcher">
        <div
          id="inProgress"
          className="h-screen flex flex-col justify-center items-center text-center gap-9"
        >
          <button className="my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-4 rounded-full text-[#4D4D4D] text-2xl font-medium cursor-pointer">
            Play
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Play;
