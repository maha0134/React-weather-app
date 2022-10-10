// import Main from "../Main/Main";
// function Home({ position }) {
//   if (position === null) {
//     return <Main position={position} />;
//   } else {
//     const coords = {
//       lat: position.coords.latitude,
//       lon: position.coords.longitude,
//     };
//     return <Main position={coords} />;
//   }
// }
import { createWeatherIcon, dateTime } from "../WeatherService/WeatherService";
import "./home.css";
function Home({ weatherDetails }) {
  if (weatherDetails && "lat" in weatherDetails) {
    const { temp, feels_like, sunrise, sunset, dt } = weatherDetails.current;
    const id = weatherDetails.current.weather[0].icon;
    let desc = weatherDetails.current.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    const img = createWeatherIcon(id);
    return (
      <div className="current-weather" tabIndex="0">
        <div className="single-file top">
          <h3>CurrentWeather</h3>
          <p>{dateTime(dt).date}</p>
        </div>
        <div className="card-content">
          <div className="single-file middle">
            <img src={img.src} alt={img.alt} />
            <h4>{temp.toFixed(1)}&deg;C</h4>
          </div>
          <div className="single-file">
            <p>{desc}</p>
            {/* <span>&#x2223;</span> */}
            <p>Feels like: {feels_like}&deg;C</p>
          </div>
          <div className="single-file">
            <p>Sunrise: {dateTime(sunrise).time}</p>
            <p>Sunset: {dateTime(sunset).time}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
export default Home;
