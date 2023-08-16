import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const CorrectAnswer = ({ onNextQuestion, remainingTime }) => {
  const [countdown, setCountdown] = useState(remainingTime);

  useEffect(() => {
    setCountdown(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [countdown]);

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return (
    <div>
      <div
        id="inProgress"
        className="h-[500px] flex flex-col justify-center items-center text-center gap-9"
      >
        {/* Display your correct answer content */}
        <img
          className="w-16 h-16 object-cover"
          src={require("../assets/ping.png")}
          alt="Correct"
        />
        {countdown > 0 ? (
          <p>
            Next game in: {hours}h {minutes}m {seconds}s
          </p>
        ) : (
          <button
            className="bg-none md:w-2/4 p-3 flex w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none gap-4 justify-center items-center"
            onClick={onNextQuestion}
          >
            Play next <AiOutlineArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default CorrectAnswer;
