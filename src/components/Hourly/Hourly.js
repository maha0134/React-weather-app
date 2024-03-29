import "./hourly.css";
import dateTime from "../../services/dateTime";
import Image from "../Image/Image";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
function Hourly({ weatherDetails, fetchStatus, location }) {
  if (weatherDetails && "lat" in weatherDetails && !fetchStatus) {
    const hourlyWeather = weatherDetails.hourly;
    const timezone = weatherDetails.timezone_offset;
    let date = dateTime(weatherDetails.current.dt, timezone).date;
    //loop through the next 6 hour data
    const hourly = hourlyWeather.slice(1, 7).map((item) => {
      let desc = item.weather[0].description;
      desc = desc.charAt(0).toUpperCase() + desc.slice(1);
      const tempObject = {
        time: dateTime(item.dt, timezone).time,
        temp: item.temp.toFixed(0),
        feels_like: item.feels_like.toFixed(0),
        desc,
        id: item.weather[0].icon,
      };
      return tempObject;
    });
    return (
      <>
        <h3 className="message">
          Showing weather results for <span>{location}</span>
        </h3>
        <div className="hourly-weather">
          <div className="heading">
            <h3>Hourly weather</h3>
            <h4>{date}</h4>
          </div>
          <ul className="unstyled-list">
            {hourly.map((item) => (
              <li key={item.time}>
                <div className="main-hourly">
                  <h4>{item.time}</h4>
                  <Image id={item.id} alt={item.desc} />
                  <h4>{item.temp}&deg;C</h4>
                </div>
                <div className="rest-hourly">
                  <p>{item.desc}</p>
                  <p>Feels like: {item.feels_like}&deg;C</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  } else if (fetchStatus) {
    return <ErrorMessage location={location} />;
  }
}
export default Hourly;
