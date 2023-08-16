import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/index.tsx";
import Switcher from "./Components/screens/Switcher";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Switcher />} />
      </Routes>
      {/* <Switcher /> */}
    </div>
  );
}

export default App;
