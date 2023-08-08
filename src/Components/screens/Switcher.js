import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import UnSollvedGame from "../screens/UnSollvedGame";
import SolvedGame from "../screens/SolvedGame";
import GameInProgress from "../screens/GameInProgress";

const Switcher = () => {
  // const [currentGame, setCurrentGame] = useState(3);
  // const allGame = 3; // Set the maximum number of pages here

  // const goToPreviousPage = () => {
  //   setCurrentGame((prevPage) => Math.max(1, prevPage - 1));
  // };

  // const goToNextPage = () => {
  //   setCurrentGame((prevPage) => Math.min(allGame, prevPage + 1));
  // };

  // let currentGameComponent;
  // switch (currentGame) {
  //   case 1:
  //     currentGameComponent = <UnSollvedGame />;
  //     break;
  //   case 2:
  //     currentGameComponent = <SolvedGame />;
  //     break;
  //   case 3:
  //     currentGameComponent = <GameInProgress />;
  //     break;
  //   default:
  //     currentGameComponent = <GameInProgress />;
  // }
  const allGame = 3; // You have 3 pages: unsolved, solved, and running
  const [currentGame, setCurrentGame] = useState(3);

  const goToPreviousPage = () => {
    setCurrentGame((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentGame((prev) => Math.min(prev + 1, allGame));
  };
  return (
    <div>
      {/* {currentGameComponent} */}
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
        {currentGame === 1 && <UnsolvedTabContent />}
        {currentGame === 2 && <SolvedTabContent />}
        {currentGame === 3 && <RunningTabContent />}
      </div>
    </div>
  );
};

const UnsolvedTabContent = () => {
  return (
    <div>
      <UnSollvedGame />
    </div>
  );
};

const SolvedTabContent = () => {
  return (
    <div>
      <SolvedGame />
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
