// 'use strict';
// const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";
// const API_KEY = "15487eec3e5e8f7846e151279d9bbd6b";
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
export default async function getForecast(options, location) {
  const { coord, units } = options;
  const cacheItem = cache.get(location);
  if (cacheItem && !isExpired(cacheItem.current.dt)) {
    console.log("returned from cache");
    return cacheItem;
  }
  const forecast = await fetchForecast({
    units,
    coord,
  });
  if (forecast) {
    cache.set(location, forecast);
    console.log(cache);
    return forecast;
  } else {
    return null;
  }

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
  const url = `${process.env.REACT_APP_BASE_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;
  console.log(url);
  let response;
  try {
    response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
  } catch (err) {
    console.log(err);
    return null;
  }
  return response.json();
}
