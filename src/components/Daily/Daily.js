import dateTime from "../../services/dateTime";
import Image from "../Image/Image";
import "./daily.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Daily({ weatherDetails, fetchStatus, location }) {
  if (weatherDetails && "lat" in weatherDetails && !fetchStatus) {
    const dailyWeather = weatherDetails.daily;
    const timezone = weatherDetails.timezone_offset;
    let date = dateTime(weatherDetails.current.dt, timezone).date;
    const daily = dailyWeather.slice(1, 7).map((item) => {
      let desc = item.weather[0].description;
      desc = desc.charAt(0).toUpperCase() + desc.slice(1);
      const tempObject = {
        dt: dateTime(item.dt, timezone),
        maxTemp: item.temp.max.toFixed(0),
        minTemp: item.temp.min.toFixed(0),
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

        <div className="daily-weather">
          <div className="heading">
            <h3>Weather this week</h3>
            <h4>{date}</h4>
          </div>
          <ul className="unstyled-list">
            {daily.map((item) => (
              <li key={item.dt.date}>
                <div className="main-daily">
                  <h4>{item.dt.date.split(",")[1]}</h4>
                  <Image id={item.id} alt={item.desc} />
                  <div className="rest-daily">
                    <h4>
                      {item.maxTemp}&deg;C | {item.minTemp}&deg;C
                    </h4>
                    <p>{item.desc}</p>
                  </div>
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

export default Daily;
