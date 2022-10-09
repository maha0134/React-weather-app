import "./App.css";
import Header from "./components/Header/Header";
import { useState, useEffect } from "react";
// import Home from "./components/Home/Home";
// import Hourly from "./components/Hourly/Hourly";
// import Daily from "./components/Daily/Daily";
// import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { getForecast } from "./components/WeatherService/WeatherService";
import Main from "./components/Main/Main";

function App() {
  const [position, setPosition] = useState(null);
  // const [location, setLocation] = useState(null);

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

  // useEffect(() => {
  //   if (position) {
  //     const coords = {
  //       lat: position.coords.latitude,
  //       lon: position.coords.longitude,
  //     };
  //     const location = { coords: coords, units: "metric" };
  //     getForecast(location).then((res) => setLocation(res));
  //   }
  // }, [position]);

  return (
    <>
      <Header />
      <NavBar />
      <Main position={position} />
      {/* <Routes>
        <Route path="/home" element={<Home position={position} />} />
        <Route path="/hourly" element={<Hourly />} />
        <Route path="/daily" element={<Daily />} />
      </Routes> */}
    </>
  );
}

export default App;
