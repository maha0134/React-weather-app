import { useState, useEffect } from "react";
import "./form.css";
import getGeolocation from "../MapService/MapService";
import { getForecast } from "../WeatherService/WeatherService";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import Loader from "../Loader/Loader";
function Form({ position }) {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(position);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [weatherFetched, setWeatherFetched] = useState(false);

  useEffect(() => {
    if (location) {
      getGeolocation(location)
        .then((res) => setCoordinates(res))
        .then(() => setLocation(""));
    }
  }, [location]);

  useEffect(() => {
    if (position && "lat" in position) {
      setCoordinates(position);
      setIsFetching(true);
    }
  }, [position]);

  useEffect(() => {
    if (coordinates) {
      const standardCoordinates = {
        coord: {
          lat: coordinates.lat,
          lon: coordinates.lon,
        },
      };
      getForecast(standardCoordinates)
        .then((res) => setWeatherDetails(res))
        .then(() => setWeatherFetched(true))
        .then(() => setIsFetching(false));
    }
  }, [coordinates]);

  function formSubmitted(ev) {
    ev.preventDefault();
    setLocation(ev.target[0].value);
    setIsFetching(true);
  }

  return (
    <>
      <form onSubmit={formSubmitted}>
        <h2>Enter a location:</h2>
        <input type="text" id="location" placeholder="Toronto,ON" />
        <label htmlFor="location" className="screen-reader-text">
          Enter location here
        </label>
        <button action="submit">Search</button>
      </form>
      {isFetching && <Loader />}
      {!coordinates && <WelcomeSection />}
      {weatherFetched && <WeatherDetails weatherDetails={weatherDetails} />}
    </>
  );
}
export default Form;
