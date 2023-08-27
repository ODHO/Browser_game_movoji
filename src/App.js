import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/index.tsx";
import Switcher from "./Components/screens/Switcher";
import "./App.css";
import Login from "./Components/screens/Login";
import Signup from "./Components/screens/Signup";
import GameInProgress from "./Components/screens/GameInProgress";
import Progress from "./Components/Navbar/NavLinks/Progress";
import LoginSignup from "./Components/screens/LoginSignup";
import SolvedGame from "./Components/screens/SolvedGame"; // Import the SolvedGame component

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check local storage for login status
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Fetch user details from local storage
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);
    }
  }, []);

  const handleLogin = (user) => {
    setLoggedInUser(user);

    // Save user details and login status to local storage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const handleSignup = (user) => {
    setLoggedInUser(user);

    // Save user details and login status to local storage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedInUser(null);

    // Clear user details and login status from local storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="App">
      <Navbar />
      <LoginSignup loggedInUser={loggedInUser} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            loggedInUser ? (
              <Switcher loggedInUser={loggedInUser} />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />

        <Route
          path="/login"
          element={
            loggedInUser ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            loggedInUser ? (
              <Navigate to="/" />
            ) : (
              <Signup onSignup={handleSignup} />
            )
          }
        />
        {loggedInUser && (
          <>
            {/* Protected routes */}
            <Route
              path="/game"
              element={<GameInProgress loggedInUser={loggedInUser} />}
            />
            <Route
              path="/progress"
              element={<Progress loggedInUser={loggedInUser} />}
            />
            {/* New protected route for the solved game history */}
            <Route
              path="/solved"
              element={<SolvedGame loggedInUser={loggedInUser} />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
