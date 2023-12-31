import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const WrongAnswer = ({ onPlayAgain }) => {
  return (
    <div>
      <div
        id="inProgress"
        className="h-[500px] flex flex-col justify-center items-center text-center gap-9"
      >
        {/* Display your wrong answer content */}
        <img
          className="w-16 h-16 object-cover"
          src={require("../assets/wrong.png")}
          alt="Wrong"
        />
        <button
          className="bg-none md:w-2/4 p-3 flex w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none gap-4 justify-center items-center"
          onClick={onPlayAgain}
        >
          <AiOutlineArrowLeft /> Play Again
        </button>
      </div>
    </div>
  );
};

export default WrongAnswer;
