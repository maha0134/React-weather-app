function WeatherDetails({ weatherDetails }) {
  if (weatherDetails && "lat" in weatherDetails) {
    console.log(weatherDetails);
    const { temp, feels_like, sunrise, sunset } = weatherDetails.current;
    return (
      <div className="current-weather">
        <h3>CurrentWeather</h3>
        <p>Temperature: {temp}</p>
        <p>Feels like: {feels_like}</p>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
      </div>
    );
  } else {
    return <></>;
  }
}

export default WeatherDetails;
