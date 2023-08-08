import React from "react";

const SolvedGame = () => {
  return (
    <div>
      <div
        id="inProgress"
        className="h-[600px] flex flex-col justify-center items-center text-center gap-9"
      >
        <h2 className="md:text-6xl text-4xl py-2 flex flex-col gap-5">
          <span>🦷🤕⌛👆</span>
          <span>🅰</span>

          <span>🪐🤔🅰🌊</span>
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
  );
};

export default SolvedGame;
