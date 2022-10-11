import { createWeatherIcon, dateTime } from "../WeatherService/WeatherService";
import "./home.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Home({ weatherDetails, fetchStatus }) {
  if (weatherDetails && "lat" in weatherDetails && !fetchStatus) {
    const { temp, feels_like, sunrise, sunset, dt } = weatherDetails.current;
    const id = weatherDetails.current.weather[0].icon;
    const timezone = weatherDetails.timezone_offset;
    let desc = weatherDetails.current.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    const img = createWeatherIcon(id);
    return (
      <div className="current-weather" tabIndex="0">
        <div className="single-file top">
          <h3>CurrentWeather</h3>
          <p>{dateTime(dt, timezone).date}</p>
        </div>
        <div className="card-content">
          <div className="single-file middle">
            <img src={img.src} alt={img.alt} />
            <h4>{temp.toFixed(0)}&deg;C</h4>
          </div>
          <div className="single-file">
            <p>{desc}</p>
            {/* <span>&#x2223;</span> */}
            <p>Feels like: {feels_like.toFixed(0)}&deg;C</p>
          </div>
          <div className="single-file">
            <p>Sunrise: {dateTime(sunrise, timezone).time}</p>
            <p>Sunset: {dateTime(sunset, timezone).time}</p>
          </div>
        </div>
      </div>
    );
  } else if (fetchStatus) {
    return <ErrorMessage />;
  }
}
export default Home;
