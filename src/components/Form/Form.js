import './form.css'
import {BiCurrentLocation} from 'react-icons/bi'
export default function Form({onSubmit,onClick}) {
  return(
    <form onSubmit={onSubmit}>
        <h2>Enter a location:</h2>
        <input type="text" id="location" placeholder="Toronto,ON" />
        <label htmlFor="location" className="screen-reader-text">
          Enter location here
        </label>
        <button className="btn" type="submit">
          Search
        </button>
        <BiCurrentLocation className="location-icon" onClick={onClick}/>
      </form>
  )
}