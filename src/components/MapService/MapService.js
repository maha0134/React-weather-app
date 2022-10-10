import { useEffect } from "react";

const API_TOKEN = "pk.afdc0278e6a7e633286ed32bc65db9fe";
const BASE_URL = "https://us1.locationiq.com/v1";

async function MapService(location) {
  const url = `${BASE_URL}/search?key=${API_TOKEN}&q=${location}&format=json`;
  const fetchFromLocalStorage = localStorage.getItem(location);
  if (fetchFromLocalStorage) {
    return JSON.parse(fetchFromLocalStorage);
  } else {
    let res;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      res = { lat: data[0].lat, lon: data[0].lon };
      localStorage.setItem(location, JSON.stringify(res));
    } catch (err) {
      return null;
    }
    return res;
  }
}
export default MapService;
