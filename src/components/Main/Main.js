import { useState, useEffect } from "react";
import "./main.css";
import getGeolocation from "../MapService/MapService";
import { getForecast } from "../WeatherService/WeatherService";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import Loader from "../Loader/Loader";
function Main({ position }) {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [weatherFetched, setWeatherFetched] = useState(false);

  useEffect(() => {
    if (location) {
      setIsFetching(true);
      getGeolocation(location).then((res) => {
        setCoordinates(res);
      });
    }
  }, [location]);

  useEffect(() => {
    if (position && "lat" in position) {
      setCoordinates(position);
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
        setWeatherDetails(res);
        setLocation("");
        setWeatherFetched(true);
        setIsFetching(false);
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
      {!coordinates && <WelcomeSection />}
      {weatherFetched && <WeatherDetails weatherDetails={weatherDetails} />}
    </main>
  );
}
export default Main;
