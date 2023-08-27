import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Set loading to true when submitting
      const response = await axios.post(
        "https://movoji.simationtechnologies.com/wp-json/browser-game-user-management/v2/login",
        { username, password }
      );
      onLogin({ user_id: response.data.user_id, user: username });

      // Set the login status in local storage
      localStorage.setItem("isLoggedIn", "true");

      navigate("/"); // Redirect to the homepage
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false); // Reset loading when request is completed
    }
  };

  return (
    <div>
      <div
        id="inProgress"
        className="h-[500px] flex flex-col justify-center items-center text-center gap-9"
      >
        <h2 className="text-3xl font-bold">Login</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 justify-center"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="bg-none p-3 w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-none p-3 w-full text-gray border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-black md:w-2/4 p-3 w-full text-white border-2 border-black rounded-lg text-2xl focus-visible:outline-offset-none focus-visible:outline-none"
            style={{ alignSelf: "center" }}
            type="submit"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-red-600 font-semibold">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
