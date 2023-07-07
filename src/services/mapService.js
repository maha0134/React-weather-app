async function mapService(location) {
  const url = `${process.env.REACT_APP_OW_BASE_URL}/search?key=${process.env.REACT_APP_OW_API_TOKEN}&q=${location}&format=json`;
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
export default mapService;
