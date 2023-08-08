import React, { useState, useEffect } from "react";
import CorrectAnswer from "./CorrectAnswer";
import WrongAnswer from "./WrongAnswer";

const GameInProgress = () => {
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  // const [userInput, setUserInput] = useState("");
  // const [currentStage, setCurrentStage] = useState(1);
  // const [correctAnswer, setCorrectAnswer] = useState("");
  // const [data, setData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const correctAnswer = "hello"; // Set the correct answer here

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // const handleNextGame = () => {
  //   setIsSubmitted(false);
  //   setUserInput("");
  //   setIsCorrectAnswer(false);
  //   if (currentStage < 3) {
  //     setCurrentStage(currentStage + 1);
  //   } else {
  //     setCurrentStage(1);
  //   }
  // };

  const renderAnswer = () => {
    if (isSubmitted) {
      return answer.toLowerCase() === correctAnswer.toLowerCase() ? (
        <CorrectAnswer />
      ) : (
        <WrongAnswer />
      );
    }
    return null;
  };

  useEffect(() => {
    setIsSubmitted(false);
  }, [window.location.search]);

  // const fetchData = async (stage) => {
  //   try {
  //     const stageInt = parseInt(stage);
  //     if (isNaN(stageInt) || stageInt <= 0 || stageInt > 3) {
  //       throw new Error("Invalid stage number");
  //     }
  //     console.log("correctAnswer", stageInt); // Log the ID to the console
  //     const response = await fetch(
  //       `http://localhost/browserGame/wordpress/wp-json/custom/v1/data?id=${stageInt}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const responseData = await response.json();
  //     setData(responseData);
  //     setCorrectAnswer(responseData.answer); // Set the correct answer from the API response
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   const stage = parseInt(userInput);
  //   if (!isNaN(stage) && stage > 0 && stage <= 3) {
  //     setCurrentStage(stage);
  //   }
  // }, [userInput]);

  // useEffect(() => {
  //   fetchData(currentStage);
  // }, [currentStage]);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div>
      {!isSubmitted && (
        <div
          id="inProgress"
          className="h-[500px] flex flex-col justify-center items-center text-center gap-9"
        >
          <h2 className="md:text-6xl text-4xl">😅😃😁🥰</h2>
          <button
            type="button"
            className="w-full md:w-2/4 lg:flex items-center text-sm leading-6 text-slate-400 py-1.5 pl-2 pr-3 border-none"
          >
            <input
              className="bg-none p-3 w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
              placeholder="Guess the movie"
              // value={answer}
              onChange={handleChange}
            />
          </button>
          <button
            className="bg-black md:w-2/4 p-3 w-full text-white border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {renderAnswer()}
    </div>
  );
};

export default GameInProgress;
