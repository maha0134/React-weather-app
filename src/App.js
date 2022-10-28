import "./App.css";
import Header from "./components/Header/Header";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";


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
    function error(err) {
      setPosition(null);
      console.log("Location unavailable because:",err.message)
    }
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <Main position={position} />
      
    </>
  );
}

export default App;
