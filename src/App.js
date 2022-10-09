import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { useState, useEffect } from "react";
import Hourly from "./components/Hourly/Hourly";
import Daily from "./components/Daily/Daily";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
    function success(position) {
      setPosition(position);
    }
    function error() {
      setPosition(null);
    }
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      {/* Form==position */}
      <Routes>
        <Route path="/home" element={<Home position={position} />} />
        <Route path="/hourly" element={<Hourly />} />
        <Route path="/daily" element={<Daily />} />
      </Routes>
    </>
  );
}

export default App;
