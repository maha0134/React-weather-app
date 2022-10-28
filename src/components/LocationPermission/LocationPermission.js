import './locationPermission.css'
import {ImLocation} from 'react-icons/im'
export default function LocationPermission() {
  
  return(
    <div className="overlay">
      <div className="permission">
      <ImLocation className='icon-location-overlay'/>
      <h2 className="overlay-message">Please enable location permission.</h2>
      </div>
    </div>
  )
}