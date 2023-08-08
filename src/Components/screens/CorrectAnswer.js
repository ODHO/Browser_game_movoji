import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const CorrectAnswer = () => {
  const handlePlayAgain = () => {
    // Navigate to the GameInProgress page
    window.location.search = "/Switcher";
  };
  return (
    <div>
      <div
        id="inProgress"
        className="h-[500px] flex flex-col justify-center items-center text-center gap-9"
      >
        <img
          className="w-16 h-16 object-cover"
          src={require("../assets/ping.png")}
        />
        <button
          className="bg-none w-full md:w-2/4 p-3 flex w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none gap-4 justify-center items-center"
          onClick={handlePlayAgain}
        >
          Play next <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CorrectAnswer;
