
const API_TOKEN = "pk.4b2a215d3f2b9c130334a32c97b28354";
const BASE_URL = "https://us1.locationiq.com/v1";

async function getGeolocation(location) {
  const url = `${BASE_URL}/search.php?key=${API_TOKEN}&q=${location}&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return { lat: data[0].lat, lon: data[0].lon };
}
export default getGeolocation