import React, { useState } from "react";
import { BiQuestionMark } from "react-icons/bi";
const UnSollvedGame = () => {
  const [showToast, setShowToast] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  const toggleToast = () => {
    setShowToast(true);
    setShowIcon(false);

    // Hide the toast and show the icon after 4 seconds
    setTimeout(() => {
      setShowToast(false);
      setShowIcon(true);
    }, 4000);
  };
  return (
    <>
      <div id="inProgress" className="h-[600px] p-2">
        <div className="border-amber-900 border-4 p-4 rounded-lg">
          {showIcon && (
            <BiQuestionMark
              className="float-right text-amber-900 text-3xl cursor-pointer"
              onClick={toggleToast}
            />
          )}
          {/* Toast message */}
          {showToast && (
            <div className="right-4 bg-amber-900 text-white px-4 py-2 rounded-md">
              It’s Tuesday! Which means a crappy movoji is provided. These are
              admittedly harder clues, but still solvable.
            </div>
          )}
          <div className="flex flex-col justify-center items-center text-center gap-9 w-full">
            <h2 className="md:text-6xl text-4xl py-2 flex flex-col gap-5">
              <span>❤️️</span>
              <span>🎭💎👨</span>
            </h2>
            <button
              type="button"
              className="w-full md:w-2/4 lg:flex items-center text-sm leading-6 text-slate-400 py-1.5 pl-2 pr-3 border-none"
            >
              <input
                className="bg-none p-3 w-full text-[#4D4D4D] border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
                placeholder="Guess the movie"
                // value={answer}
                // onChange={handleChange}
              />
            </button>
            <button
              className="bg-black md:w-2/4 p-3 w-full text-white border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
              // onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnSollvedGame;
