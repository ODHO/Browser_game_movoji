import React, { useState } from "react";
import "../../Navbar/Components/Navbar.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HowToPlay from "../NavLinks/HowToPlay";
import Progress from "../NavLinks/Progress";
import Archive from "../NavLinks/Archive";
import ContactUs from "../NavLinks/ContactUs";

export const Topnav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    setActiveTab(null); // Reset active tab when closing the menu
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBackClick = () => {
    setActiveTab(null); // Reset active tab when clicking back
  };

  return (
    <>
      <nav
        className={`bottom-0 left-0 right-0 p-4 shadow-md z-50 rounded-lg ${
          isMenuOpen ? "bg-[#DDDDDD]" : "bg[#ffffff]"
        }`}
      >
        <div className="grid grid-cols-2">
          <div className="flex items-center">
            {/* <img
              src="your-logo.png"
              alt="Logo"
              className="h-8 w-8 mr-2"
            /> */}
            <Link to="/">
              <span className="text-4xl font-bold">movoji</span>
            </Link>
          </div>
          <div className="float-right flex justify-end items-center gap-4">
            <button
              onClick={toggleMenu}
              className="focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <svg
                className="w-10 h-10 focus:outline-[#ddd auto 5px] focus:ring-white[#ddd] text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 h-screen flex flex-col">
            {!activeTab && (
              <ul className="flex flex-col items-center gap-4">
                <li
                  onClick={() => handleTabClick("howToPlay")}
                  className={`my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-4 rounded-full text-[#4D4D4D] text-2xl font-medium cursor-pointer ${
                    activeTab === "howToPlay" ? "bg-gray-300" : ""
                  }`}
                >
                  How to play
                </li>
                <li
                  onClick={() => handleTabClick("progress")}
                  className={`my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-4 rounded-full text-[#4D4D4D] text-2xl font-medium cursor-pointer ${
                    activeTab === "progress" ? "bg-gray-300" : ""
                  }`}
                >
                  Progress
                </li>
                <li
                  onClick={() => handleTabClick("archive")}
                  className={`my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-4 rounded-full text-[#4D4D4D] text-2xl font-medium cursor-pointer ${
                    activeTab === "archive" ? "bg-gray-300" : ""
                  }`}
                >
                  Archive
                </li>
                <li
                  onClick={() => handleTabClick("contact")}
                  className={`my-2 hover:text-gray-800 transition duration-300 w-full md:w-2/4 bg-white p-4 rounded-full text-[#4D4D4D] text-2xl font-medium cursor-pointer ${
                    activeTab === "contact" ? "bg-gray-300" : ""
                  }`}
                >
                  Contact
                </li>
              </ul>
            )}
            <div className="p-4 justify-center">
              {activeTab && (
                <button
                  onClick={handleBackClick}
                  className="focus:outline-none text-gray-600 justify-start float-left md:block contents"
                >
                  <AiOutlineArrowLeft className="md:text-6xl text-4xl" />
                </button>
              )}
              {activeTab === "howToPlay" && (
                <div className="flex justify-center">
                  <HowToPlay />
                </div>
              )}
              {activeTab === "progress" && (
                <div className="flex justify-center">
                  <Progress />
                </div>
              )}
              {activeTab === "archive" && (
                <div className="flex justify-center">
                  <Archive />
                </div>
              )}
              {activeTab === "contact" && (
                <div className="flex justify-center">
                  <ContactUs />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
