function WeatherDetails({ weatherDetails }) {
  console.log(weatherDetails);
  // if (weatherDetails && "lat" in weatherDetails) {
  const { temp, feels_like, sunrise, sunset } = weatherDetails.current;
  return (
    <>
      <h3>CurrentWeather</h3>
      <p>Temperature: {temp}</p>
      <p>Feels like: {feels_like}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </>
  );
  // } else {
  //   return <></>;
  // }
}

export default WeatherDetails;
