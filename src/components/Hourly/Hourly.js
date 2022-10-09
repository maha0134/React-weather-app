function Hourly({ weatherDetails }) {
  if (weatherDetails && "lat" in weatherDetails) {
    const hourlyWeather = weatherDetails.hourly;
    let date = new Date(weatherDetails.current.dt * 1000).toLocaleDateString();
    const hourly = hourlyWeather.slice(0, 6).map((item) => {
      const tempObject = {
        time: new Date(item.dt * 1000).toLocaleTimeString(),
        temp: item.temp,
        feels_like: item.feels_like,
        desc: item.weather.description,
      };
      return tempObject;
    });
    return (
      <div className="current-weather">
        <h3>Hourly weather</h3>
        <p>{date}</p>
        {hourly.map((item) => (
          <div key={item.temp}>
            <p>{item.time}</p>
            <p>Temperature: {item.temp}</p>
            <p>Feels like: {item.feels_like}</p>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default Hourly;
