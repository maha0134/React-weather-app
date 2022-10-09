// 'use strict';
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";
const API_KEY = "15487eec3e5e8f7846e151279d9bbd6b";
// const DEFAULT_OPTIONS = {
//   coord: {
//     lat: 45.35,
//     lon: -75.76,
//   }, // Algonquin College
//   units: "metric",
// };
const cache = new Map();

/**
 * @typedef {Object} APIOptions
 * @property {string} units [metric, imperial, standard]
 * @property {Object} coord Location coordinates
 * @property {number} coord.lon Longitude
 * @property {number} coord.lat Latitude
 */

/**
 * Get the latest weather forecast for the given location.
 * Results are cached for 10 minutes.
 * @param {APIOptions} options
 * @returns {Object} Forecast results
 * @see https://openweathermap.org/api/one-call-api#data
 */
export async function getForecast(options, location) {
  const { coord, units } = options;
  if (!location) location = "current";
  const cacheItem = cache.get(location);
  if (cacheItem && !isExpired(cacheItem.current.dt)) {
    //TODO remove console
    console.log(cache, "returned from cache");
    return cacheItem;
  }
  const forecast = await fetchForecast({
    units,
    coord,
  });
  cache.set(location, forecast);
  console.log(cache);
  return forecast;

  /**
   * Helper function to check cache expiry
   * @param {number} cacheTime UNIX timestamp in seconds
   */
  function isExpired(cacheTime) {
    const TEN_MINUTES = 600; // seconds
    const currentTime = Math.floor(Date.now() / 1000); // convert from ms to s
    const elapsedTime = currentTime - cacheTime;
    return elapsedTime > TEN_MINUTES;
  }
}

/**
 * Private function to make the actual `fetch()` call to the API
 * @param {APIOptions} options
 */
async function fetchForecast({ coord: { lat, lon }, units }) {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

/**
 * Returns an <img> HTMLElement with the correct URL to display
 * the OpenWeather image corresponding to the given `iconCode`.
 * @param {string} iconCode
 */
export function createWeatherIcon(iconCode) {
  let img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://openweathermap.org/img/w/" + iconCode + ".png"
  );
  img.setAttribute("alt", "");
  return img;
}
