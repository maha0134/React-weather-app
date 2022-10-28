import { useState, useEffect } from "react";
import "./main.css";
import mapService from "../../services/mapService";
import getForecast from "../../services/getForecast";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import Loader from "../Loader/Loader";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Hourly from "../Hourly/Hourly";
import Daily from "../Daily/Daily";
import Form from "../Form/Form";
import Aside from "../Aside/Aside";
import LocationPermission from "../LocationPermission/LocationPermission";

function Main({ position }) {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchFail, setFetchFail] = useState(false);
  const [locationArray, setLocationArray] = useState([]);
  const [currentLocation,setCurrentLocation] = useState(false);
  const [locationPermission,setLocationPermission] = useState(true)

  //Fetch recent searches,if any, from local storage on load
  useEffect(()=>{
    const locations = {...localStorage}
    const fetchFromStorage = []
    for(const key in locations){
      fetchFromStorage.push(key)
    }
    setLocationArray(fetchFromStorage)
  },[])
  //when form is submitted, fetch coordinates
  useEffect(() => {
    const tempArray = [...locationArray]
    if (location && !tempArray.includes(location) && location!=="current location") {
      setIsFetching(true);
      setFetchFail(false);
      mapService(location).then((res) => {
        if (res) {
          setCoordinates(res);
          tempArray.unshift(location)
          if (tempArray.length > 3) {
            localStorage.removeItem(tempArray[3]);
            setLocationArray(tempArray.slice(0,3));
          } else {
            setLocationArray(tempArray);
          }
        } else {
          setFetchFail(true);
          setIsFetching(false);
        }
      });
    }
  }, [location,locationArray]);
  
  //if user allows location, skip fetching coordinates
  useEffect(() => {
    if (position && "coords" in position) {
      const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setLocation("current location")
      setCoordinates(coords);
      setIsFetching(true);
    }
  }, [position,currentLocation]);

  //fetch weather whenever coordinates are available
  useEffect(() => {
    if (coordinates && "lat" in coordinates) {
      const standardCoordinates = {
        coord: {
          lat: coordinates.lat,
          lon: coordinates.lon,
        },
        units: "metric",
      };
      getForecast(standardCoordinates, location).then((res) => {
        if (res) {
          setFetchFail(false);
          setWeatherDetails(res);
          setIsFetching(false);
        } else {
          setFetchFail(true);
        }
        setCoordinates(null)
      });
    }
  }, [coordinates,location]);

  //handle form submission
  function formSubmitted(ev) {
    ev.preventDefault();
    const query = ev.target[0].value;
    if (query) {
      setLocation(query);
      if (locationArray.includes(query)) {
        setCoordinates(JSON.parse(localStorage.getItem(query)));
      }
    }
  }

  //handle clicks on the aside 
  function handleClick(ev) {
    setIsFetching(true);
    ev.preventDefault();
    const button = ev.target.innerText;
    setLocation(button);
    setCoordinates(JSON.parse(localStorage.getItem(button)));
  }

  //location button clicked
  function showCurrentLocation(){
    if(position && "coords" in position){
      setCurrentLocation(!currentLocation)
    }else{
      setLocationPermission(false)
      setTimeout(()=>{
        setLocationPermission(true)
      },2000)
    }
  }

  return (
    <main>
      <Form onSubmit={formSubmitted} onClick={showCurrentLocation}/>
      {isFetching && <Loader />}
      {!location && !fetchFail && <WelcomeSection />}
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              weatherDetails={weatherDetails}
              fetchStatus={fetchFail}
              location={location}
            />
          }
        />
        <Route
          path="/hourly"
          element={
            <Hourly
              weatherDetails={weatherDetails}
              fetchStatus={fetchFail}
              location={location}
            />
          }
        />
        <Route
          path="/daily"
          element={
            <Daily
              weatherDetails={weatherDetails}
              fetchStatus={fetchFail}
              location={location}
            />
          }
        />
        {/* Redirect every other route to Home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      {locationArray.length > 0 && <Aside locationArray={locationArray} onClick={handleClick}/>}
      
      {!locationPermission && <LocationPermission />}
    </main>
  );
}
export default Main;
