import React from "react";
import Calendar from "react-calendar";

const Archive = () => {
  return (
    <div className="my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-5 rounded-lg text-[#4D4D4D] text-2xl font-medium">
      <h2 className="pb-4 text-3xl text-[#4D4D4D]">Archive</h2>
      <Calendar />
    </div>
  );
};

export default Archive;
