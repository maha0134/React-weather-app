import dateTime from "../../services/dateTime";
import Image from "../Image/Image";
import "./home.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Home({ weatherDetails, fetchStatus, location }) {
  if (weatherDetails && "lat" in weatherDetails && !fetchStatus) {
    const { temp, feels_like, sunrise, sunset, dt } = weatherDetails.current;
    const id = weatherDetails.current.weather[0].icon;
    const timezone = weatherDetails.timezone_offset;

    let desc = weatherDetails.current.weather[0].description;
    //capitalize first alphabet of description
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);

    return (
      <>
        <h3 className="message">
          Showing weather results for <span>{location}</span>
        </h3>
        <div className="current-weather" tabIndex="0">
          <div className="heading">
            <h3>CurrentWeather</h3>
            <h4>{dateTime(dt, timezone).date}</h4>
          </div>

          <div className="card-content">
            <div className="single-file middle">
              <Image id={id} alt={desc} />
              <h4 className="big-text">{temp.toFixed(0)}&deg;C</h4>
            </div>
            <div className="single-file">
              <p>{desc}</p>
              <p>Feels like: {feels_like.toFixed(0)}&deg;C</p>
            </div>
            <div className="single-file">
              <p>Sunrise: {dateTime(sunrise, timezone).time}</p>
              <p>Sunset: {dateTime(sunset, timezone).time}</p>
            </div>
          </div>
        </div>
      </>
    );
  } else if (fetchStatus) {
    return <ErrorMessage location={location} />;
  }
}
export default Home;
