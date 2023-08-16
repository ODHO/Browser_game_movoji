import React, { useState, useEffect } from "react";
import axios from "axios";
// import CorrectAnswer from "./CorrectAnswer";
// import WrongAnswer from "./WrongAnswer";
import Loader from "../assets/Loader.gif";
import { BiQuestionMark } from "react-icons/bi";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const GameInProgress = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [nextGameDate, setNextGameDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [userScore, setUserScore] = useState(
    parseInt(localStorage.getItem("userScore")) || 0
  );
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          `https://movoji.simationtechnologies.com/wp-json/wp/v2/posts/?date=${currentDate}`
        );
        setQuestions(response.data);

        const storedIndex = localStorage.getItem("currentQuestionIndex");
        const storedCorrectAnswer = localStorage.getItem("isCorrectAnswer");
        const storedRemainingTime = localStorage.getItem("remainingTime");

        setCurrentQuestionIndex(
          storedIndex !== null ? parseInt(storedIndex) : 0
        );
        setIsCorrectAnswer(
          storedCorrectAnswer !== null && storedCorrectAnswer === "true"
        );
        setRemainingTime(
          storedRemainingTime !== null
            ? parseInt(storedRemainingTime)
            : calculateRemainingTime(nextGameDate)
        );

        const nextGame = new Date();
        nextGame.setDate(nextGame.getDate() + 1);
        nextGame.setHours(0, 0, 0, 0);
        setNextGameDate(nextGame);
        setIsLoading(false);
        const interval = setInterval(() => {
          const timeRemaining = calculateRemainingTime(nextGame);
          setRemainingTime(timeRemaining);
        }, 1000);
        const lastSolvedIndex = JSON.parse(
          localStorage.getItem("lastSolvedIndex")
        );
        const lastSolvedTimestamp = JSON.parse(
          localStorage.getItem("lastSolvedTimestamp")
        );

        // Check if the last solved index matches the current question index
        if (
          lastSolvedIndex !== null &&
          lastSolvedIndex === currentQuestionIndex
        ) {
          const currentTime = Date.now();
          const timeDifference = currentTime - lastSolvedTimestamp;
          if (timeDifference < 24 * 60 * 60 * 1000) {
            const nextGame = new Date(
              lastSolvedTimestamp + 24 * 60 * 60 * 1000
            );
            nextGame.setHours(0, 0, 0, 0);
            setNextGameDate(nextGame);
          } else {
            const nextGame = new Date();
            nextGame.setDate(nextGame.getDate() + 1);
            nextGame.setHours(0, 0, 0, 0);
            setNextGameDate(nextGame);
          }
        }
        return () => {
          clearInterval(interval);
        };
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    const currentTime = Date.now();
    const lastSolvedTimestamp = JSON.parse(
      localStorage.getItem("lastSolvedTimestamp")
    );
    const timeDifference = currentTime - lastSolvedTimestamp;
    const timeRemaining = calculateRemainingTime(nextGameDate);

    if (isCorrectAnswer) {
      setRemainingTime(Math.max(0, timeRemaining - timeDifference / 1000));
    }
  }, [isCorrectAnswer]);

  const calculateRemainingTime = (targetDate) => {
    const currentTime = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const timeDifference = targetTime - currentTime;

    return Math.max(0, Math.floor(timeDifference / 1000));
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const handleNextQuestion = () => {
    setUserAnswer("");
    setIsCorrectAnswer(false);
    setIsWrongAnswer(false);

    if (isCorrectAnswer && remainingTime === 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRemainingTime(calculateRemainingTime(nextGameDate));

      localStorage.setItem("currentQuestionIndex", currentQuestionIndex + 1);
      localStorage.setItem("isCorrectAnswer", false);
      localStorage.setItem(
        "remainingTime",
        calculateRemainingTime(nextGameDate)
      );
    }
  };

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const correctAnswer = questions[currentQuestionIndex]?.content.rendered
      .replace(/<\/?[^>]+(>|$)/g, "")
      .trim();

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setIsCorrectAnswer(true);

      // Increase the user's score by 1 for each correct answer
      const updatedScore = userScore + 1;
      setUserScore(updatedScore);

      // Store the updated user score in local storage
      localStorage.setItem("userScore", updatedScore.toString());

      const solvedQuestion = {
        title: questions[currentQuestionIndex]?.title.rendered,
        content: questions[currentQuestionIndex]?.content.rendered,
        timestamp: Date.now(),
      };

      const solvedQuestions =
        JSON.parse(localStorage.getItem("solvedQuestions")) || [];
      solvedQuestions.push(solvedQuestion);

      localStorage.setItem("solvedQuestions", JSON.stringify(solvedQuestions));
      localStorage.setItem("lastSolvedTimestamp", Date.now());
      localStorage.setItem("isCorrectAnswer", true);
    } else {
      setIsWrongAnswer(true);
    }
  };

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

  const toggleToast = () => {
    setShowToast(true);
    setShowIcon(false);

    setTimeout(() => {
      setShowToast(false);
      setShowIcon(true);
    }, 4000);
  };

  const isTuesday = new Date().getDay() === 2;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-28 cover" src={Loader} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      {!isCorrectAnswer &&
        !isWrongAnswer &&
        currentQuestionIndex < questions.length && (
          <div className="mt-4">
            <div
              id="inProgress"
              className={`flex flex-col justify-center items-center text-center gap-4 ${
                isTuesday
                  ? "border-amber-900 border-4 p-4 rounded-lg h-[500px]"
                  : "h-[600px]"
              }`}
            >
              {isTuesday && ( // Display the added code only on Thursdays
                <div
                  className="float-right text-amber-900 text-3xl cursor-pointer absolute flex justify-end"
                  style={{ top: "108px", right: "16px", width: "90%" }}
                >
                  {showIcon && <BiQuestionMark onClick={toggleToast} />}
                  {showToast && (
                    <div className="p-2 ml-5">
                      <div className="bg-amber-900 text-white text-base px-4 ml-4 py-2 rounded-md w-11/12">
                        It’s Tuesday! Which means a crappy movoji is provided.
                        These are admittedly harder clues, but still solvable.
                      </div>
                    </div>
                  )}
                </div>
              )}

              <h2 className="md:text-6xl text-4xl" style={{ width: "50%" }}>
                {questions[currentQuestionIndex]?.title.rendered}
              </h2>
              <button
                type="button"
                className="w-full md:w-2/4 lg:flex items-center text-sm leading-6 text-slate-400 py-1.5 border-none"
              >
                <input
                  className="bg-none p-3 w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
                  placeholder="Guess the movie"
                  onChange={handleChange}
                  value={userAnswer}
                />
              </button>
              <button
                className="bg-black md:w-2/4 p-3 w-full text-white border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}

      {isCorrectAnswer ? (
        <div className="h-[500px] flex flex-col justify-center items-center text-center gap-9">
          <img
            className="w-16 h-16 object-cover"
            src={require("../assets/ping.png")}
            alt="Correct"
          />
          {remainingTime > 0 ? (
            <p className="text-2xl font-semibold">
              Next game in: {hours}h {minutes}m {seconds}s
            </p>
          ) : (
            <button
              className={`bg-none md:w-2/4 p-3 flex w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none gap-4 justify-center items-center ${
                remainingTime ? "hidden" : "flex"
              }`}
              onClick={handleNextQuestion}
            >
              Play next <AiOutlineArrowRight />
            </button>
          )}
        </div>
      ) : (
        isWrongAnswer && (
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
              onClick={handleNextQuestion}
            >
              <AiOutlineArrowLeft /> Play Again
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default GameInProgress;
