import React from "react";
import { Link } from "react-router-dom";

const LoginSignup = ({ loggedInUser, onLogout }) => {
  return (
    <div className="text-lrft">
      <div className="flex md:flex-row items-center gap-4 float-right mt-6">
        {loggedInUser ? (
          <div>
            Welcome, {loggedInUser.user}!
            <button
              onClick={onLogout}
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                marginLeft: "10px",
              }}
              className="hover:text-gray-800 transition duration-300 bg-white py-1 rounded-lg text-[#4D4D4D] text-base font-semibold cursor-pointer border-2 border-black"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
              className="hover:text-gray-800 transition duration-300 bg-white py-1 rounded-lg text-[#4D4D4D] text-base font-semibold cursor-pointer border-2 border-black"
            >
              <Link to="/login">Login</Link>
            </button>
            <button
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
              className="hover:text-gray-800 transition duration-300 bg-white py-1 rounded-lg text-[#4D4D4D] text-base font-semibold cursor-pointer border-2 border-black"
            >
              <Link to="/signup">Signup</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
