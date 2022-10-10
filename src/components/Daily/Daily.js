function Daily({ weatherDetails }) {
  if (weatherDetails && "lat" in weatherDetails) {
    const dailyWeather = weatherDetails.daily;
    let date = new Date(weatherDetails.current.dt * 1000).toLocaleDateString();
    const daily = dailyWeather.slice(1, 7).map((item) => {
      const tempObject = {
        dt: new Date(item.dt * 1000).toLocaleDateString(),
        dayTemp: item.feels_like.day,
        nightTemp: item.feels_like.night,
        desc: item.weather[0].description,
      };
      return tempObject;
    });
    return (
      <div className="daily-weather">
        <h3>Weather this week</h3>
        <p>{date}</p>
        <ul className="unstyled-list">
          {daily.map((item) => (
            <li key={item.dt}>
              <p>{item.dt}</p>
              <p>Temperature: {item.dayTemp + "/" + item.nightTemp}</p>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Daily;
