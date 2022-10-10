import { useState, useEffect } from "react";
import "./main.css";
import getGeolocation from "../MapService/MapService";
import { getForecast } from "../WeatherService/WeatherService";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import Loader from "../Loader/Loader";

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Hourly from "../Hourly/Hourly";
import Daily from "../Daily/Daily";

function Main({ position }) {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [weatherFetched, setWeatherFetched] = useState(false);
  const [fetchFail, setFetchFail] = useState(false);

  useEffect(() => {
    if (location) {
      setIsFetching(true);
      setFetchFail(false);
      getGeolocation(location).then((res) => {
        if (res) {
          setCoordinates(res);
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
          setWeatherDetails(res);
          setLocation("");
          setWeatherFetched(true);
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

  return (
    <main>
      <form onSubmit={formSubmitted}>
        <h2>Enter a location:</h2>
        <input type="text" id="location" placeholder="Toronto,ON" />
        <label htmlFor="location" className="screen-reader-text">
          Enter location here
        </label>
        <button type="submit">Search</button>
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
    </main>
  );
}
export default Main;
