import { dateTime, createWeatherIcon } from "../WeatherService/WeatherService";
import "./daily.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Daily({ weatherDetails, fetchStatus }) {
  if (weatherDetails && "lat" in weatherDetails) {
    const dailyWeather = weatherDetails.daily;
    const timezone = weatherDetails.timezone_offset;
    let date = dateTime(weatherDetails.current.dt, timezone).date;
    const daily = dailyWeather.slice(1, 7).map((item) => {
      let desc = item.weather[0].description;
      desc = desc.charAt(0).toUpperCase() + desc.slice(1);
      const tempObject = {
        dt: dateTime(item.dt, timezone),
        dayTemp: item.feels_like.day.toFixed(0),
        nightTemp: item.feels_like.night.toFixed(0),
        desc,
        id: item.weather[0].icon,
      };
      return tempObject;
    });
    return (
      <div className="daily-weather">
        <div className="heading">
          <h3>Weather this week</h3>
          <h4>{date}</h4>
        </div>
        <ul className="unstyled-list">
          {daily.map((item) => (
            <li key={item.dt.date}>
              <h4>{item.dt.date.split(",")[1]}</h4>
              <img
                src={createWeatherIcon(item.id).src}
                alt={createWeatherIcon(item.id).alt}
              />
              <h4>
                {item.dayTemp}&deg;C | {item.nightTemp}&deg;C
              </h4>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (fetchStatus) {
    return <ErrorMessage />;
  }
}

export default Daily;
