import { useState, useEffect } from "react";
import "./main.css";
import mapService from "../../helperFunctions/mapService";
import getForecast from "../../helperFunctions/getForecast";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import Loader from "../Loader/Loader";
// import Aside from "../Aside/Aside";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Hourly from "../Hourly/Hourly";
import Daily from "../Daily/Daily";

function Main({ position }) {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchFail, setFetchFail] = useState(false);
  const [locationArray, setLocationArray] = useState([]);

  useEffect(() => {
    if (location && !locationArray.includes(location)) {
      setIsFetching(true);
      setFetchFail(false);
      mapService(location).then((res) => {
        if (res) {
          setCoordinates(res);
          if (!locationArray.includes(location)) {
            locationArray.push(location);
            if (locationArray.length > 3) {
              localStorage.removeItem(locationArray[0]);
              setLocationArray(locationArray.slice(1));
            } else {
              setLocationArray(locationArray);
            }
          }
        } else {
          setFetchFail(true);
          setIsFetching(false);
        }
      });
    }
  }, [location]);

  useEffect(() => {
    if (position && "coords" in position) {
      const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setCoordinates(coords);
      setIsFetching(true);
    }
  }, [position]);

  useEffect(() => {
    if (coordinates && "lat" in coordinates) {
      const standardCoordinates = {
        coord: {
          lat: coordinates.lat,
          lon: coordinates.lon,
        },
        units: "metric",
      };
      getForecast(standardCoordinates, location).then((res) => {
        if (res) {
          setFetchFail(false);
          setWeatherDetails(res);
          setLocation("");
          setIsFetching(false);
        } else {
          setFetchFail(true);
        }
      });
    }
  }, [coordinates]);

  function formSubmitted(ev) {
    ev.preventDefault();
    if (ev.target[0].value) {
      setLocation(ev.target[0].value);
      setIsFetching(true);
    }
  }

  function handleClick(ev) {
    setIsFetching(true);
    ev.preventDefault();
    console.log(ev.target.innerText);
    const button = ev.target.innerText;
    setLocation(button);
    setCoordinates(JSON.parse(localStorage.getItem(button)));
  }
  return (
    <main>
      <form onSubmit={formSubmitted}>
        <h2>Enter a location:</h2>
        <input type="text" id="location" placeholder="Toronto,ON" />
        <label htmlFor="location" className="screen-reader-text">
          Enter location here
        </label>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      {isFetching && <Loader />}
      {!coordinates && !fetchFail && <WelcomeSection />}
      <Routes>
        <Route
          path="/home"
          element={
            <Home weatherDetails={weatherDetails} fetchStatus={fetchFail} />
          }
        />
        <Route
          path="/hourly"
          element={
            <Hourly weatherDetails={weatherDetails} fetchStatus={fetchFail} />
          }
        />
        <Route
          path="/daily"
          element={
            <Daily weatherDetails={weatherDetails} fetchStatus={fetchFail} />
          }
        />
        {/* Redirect every other route to Home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      {locationArray.length > 0 && (
        <aside>
          <h3>Recent Searches:</h3>
          <ul className="unstyled-list">
            {locationArray.map((item) => (
              <li key={`item${item}`} onClick={handleClick} className="btn">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}
export default Main;
