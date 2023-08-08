import React from "react";

const HowToPlay = () => {
  return (
    <div className="my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-5 rounded-lg text-[#4D4D4D] text-2xl font-medium">
      <h2 className="pb-4 text-3xl text-[#4D4D4D]">How to play</h2>
      <p className="text-lg text-[#4D4D4D]">
        A daily puzzle where emojis spell the names of well-known movies.
        <br /> You don't need to have seen the movie, only to have heard of the
        title.
        <br />
        For example, the movoji for Pinocchio is:
        <br />
        📌👎🔑😯 <br />
        (Pin-No-Key-Oh)
        <br />
        Note how the clue is about the phonetics, and has nothing to do with
        wooden puppets and crickets.
      </p>
    </div>
  );
};

export default HowToPlay;
