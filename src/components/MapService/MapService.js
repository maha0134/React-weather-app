const API_TOKEN = "pk.afdc0278e6a7e633286ed32bc65db9fe";
const BASE_URL = "https://us1.locationiq.com/v1";

async function getGeolocation(location) {
  const url = `${BASE_URL}/search?key=${API_TOKEN}&q=${location}&format=json`;
  let res;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    res = { lat: data[0].lat, lon: data[0].lon };
  } catch (err) {
    return null;
  }
  return res;
}
export default getGeolocation;
