import "./App.css";
import Header from "./components/Header/Header";
import Section from "./components/Section/Section";
import { useState, useEffect } from "react";

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
      console.log(position);
      setPosition(position);
    }
    function error() {
      setPosition(null);
    }
  }, []);
  return (
    <>
      <Header />
      <Section position={position} />
    </>
  );
}

export default App;
