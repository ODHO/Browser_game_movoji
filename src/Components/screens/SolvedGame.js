import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const SolvedGame = () => {
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  useEffect(() => {
    const solvedQuestionsData =
      JSON.parse(localStorage.getItem("solvedQuestions")) || [];
    setSolvedQuestions(solvedQuestionsData);
  }, []);

  // Add navigation arrows here
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousGame = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNextGame = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, solvedQuestions.length - 1)
    );
  };
  return (
    <div>
      {solvedQuestions.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="md:text-3xl text-4xl py-2 flex-col gap-5">
            You have no passed games.
          </p>
        </div>
      ) : (
        <div className="h-[500px] flex flex-col justify-center items-center text-center gap-4">
          {solvedQuestions.map((question, index) => (
            <div
              key={index}
              id="inProgress"
              className="flex-col justify-center items-center text-center absolute w-full block"
            >
              <div>
                <h2
                  className={`md:text-6xl text-4xl py-2 flex flex-col gap-5 ${
                    index === currentIndex ? "" : "hidden"
                  }`}
                >
                  {question.title}
                </h2>
                <button
                  type="button"
                  className={`w-full md:p-0 p-2 lg:flex justify-center items-center text-sm leading-6 text-slate-400 py-1.5 border-none ${
                    index === currentIndex ? "" : "hidden"
                  }`}
                >
                  <input
                    className={`bg-none p-3 md:w-2/4 w-full text-[#4D4D4D] border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none text-center ${
                      index === currentIndex ? "" : "hidden"
                    }`}
                    placeholder="Guess the movie"
                    value={question.content.replace(/<\/?[^>]+(>|$)/g, "")}

                    // onChange={handleChange}
                  />
                </button>
              </div>
              <div
                className={`flex justify-center mt-4 ${
                  index === currentIndex ? "" : "hidden"
                }`}
              >
                <AiOutlineArrowLeft
                  onClick={goToPreviousGame}
                  className={`${
                    currentIndex === 0
                      ? "hidden"
                      : "text-gray-600 hover:text-gray-800"
                  } transition duration-300 text-2xl`}
                />
                <span className="mx-4 text-2xl">
                  {currentIndex + 1} / {solvedQuestions.length}
                </span>
                <AiOutlineArrowRight
                  onClick={goToNextGame}
                  className={`${
                    currentIndex === solvedQuestions.length - 1
                      ? "hidden"
                      : "text-gray-600 hover:text-gray-800"
                  } transition duration-300 text-2xl`}
                />
              </div>
              {/* <button
            className="bg-black md:w-2/4 p-3 w-full text-white border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
            // onClick={handleSubmit}
          >
            Submit
          </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SolvedGame;
