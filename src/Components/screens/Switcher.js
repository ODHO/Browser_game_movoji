import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import UnSollvedGame from "../screens/UnSollvedGame";
import SolvedGame from "../screens/SolvedGame";
import GameInProgress from "../screens/GameInProgress";

const Switcher = ({ loggedInUser }) => {
  // Pass the loggedInUser prop here
  const allGame = 2;
  const [currentGame, setCurrentGame] = useState(2);

  const goToPreviousPage = () => {
    setCurrentGame((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentGame((prev) => Math.min(prev + 1, allGame));
  };

  return (
    <div>
      <div
        className="absolute bottom-0 justify-center items-center inline-flex"
        style={{ marginLeft: "-65px" }}
      >
        <AiOutlineArrowLeft
          onClick={goToPreviousPage}
          className={`${
            currentGame === 1 ? "hidden" : "text-gray-600 hover:text-gray-800"
          } transition duration-300 text-2xl`}
        />
        <span className="mx-4 text-2xl">
          {currentGame} / {allGame}
        </span>
        <AiOutlineArrowRight
          onClick={goToNextPage}
          className={`${
            currentGame === allGame
              ? "hidden"
              : "text-gray-600 hover:text-gray-800"
          } transition duration-300 text-2xl`}
        />
      </div>
      <div className="content">
        {currentGame === 1 && <SolvedTabContent loggedInUser={loggedInUser} />}

        {/* Pass loggedInUser prop here */}
        {currentGame === 2 && <RunningTabContent />}
      </div>
    </div>
  );
};

const SolvedTabContent = ({ loggedInUser }) => {
  // Receive loggedInUser prop here
  return (
    <div>
      <SolvedGame loggedInUser={loggedInUser} />{" "}
      {/* Pass loggedInUser prop to SolvedGame */}
    </div>
  );
};

const RunningTabContent = () => {
  return (
    <div>
      <GameInProgress />
    </div>
  );
};

export default Switcher;
