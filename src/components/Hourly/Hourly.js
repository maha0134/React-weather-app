import "./hourly.css";
import { dateTime, createWeatherIcon } from "../WeatherService/WeatherService";
function Hourly({ weatherDetails }) {
  if (weatherDetails && "lat" in weatherDetails) {
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
      <div className="hourly-weather">
        <div className="heading">
          <h3>Hourly weather</h3>
          <h4>{date}</h4>
        </div>
        <ul className="unstyled-list">
          {hourly.map((item) => (
            <li key={item.time}>
              <h4>{item.time}</h4>
              <img
                src={createWeatherIcon(item.id).src}
                alt={createWeatherIcon(item.id).alt}
              />
              <h5>{item.temp}&deg;C</h5>
              <p>{item.desc}</p>
              <p>Feels like: {item.feels_like}&deg;C</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Hourly;
