import WelcomeSection from "../WelcomeSection/WelcomeSection";
import { useState, useEffect } from "react";
import "./form.css";
import MapService from "../MapService/MapService";
function Form() {
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (location) {
      const locationFromAPI = MapService(location);
      console.log(locationFromAPI);
    }
  }, [location]);

  function formSubmitted(ev) {
    ev.preventDefault();
    setLocation(ev.target[0].value);
  }

  return (
    <>
      <form
        onSubmit={formSubmitted}
        style={{ textAlign: "center", fontSize: "2rem", padding: "2rem" }}
      >
        <h2>Enter a location:</h2>
        <input
          type="text"
          id="location"
          placeholder="Toronto,ON"
          style={{ fontSize: "1.5rem", padding: "1rem" }}
        />
        <label htmlFor="location" className="screen-reader-text">
          Enter location here
        </label>
        <button action="submit">Search</button>
      </form>
      <WelcomeSection />
    </>
  );
}
export default Form;
