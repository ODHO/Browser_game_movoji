import React from "react";

const Progress = () => {
  const userScore = parseInt(localStorage.getItem("userScore")) || 0;

  return (
    <div className="my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-5 rounded-lg text-[#4D4D4D] text-2xl font-medium">
      <h2 className="pb-4 text-3xl text-[#4D4D4D]">Progress</h2>
      <p className="md:text-lg text-base text-[#4D4D4D] flex flex-col gap-2">
        <span>Your movoji streak is:</span>
        <span className="text-4xl">22</span>

        <span className="mt-3">Your total score is:</span>
        <span className="text-4xl">{userScore}/253</span>
      </p>
    </div>
  );
};

export default Progress;
