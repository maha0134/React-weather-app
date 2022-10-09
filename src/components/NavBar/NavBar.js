import { Link, NavLink } from "react-router-dom";
import "./navBar.css";
function NavBar() {
  const myStyle = ({ isActive }) => ({
    color: isActive ? "rgb(0, 255, 174)" : "white",
  });
  return (
    <ul className="nav-list">
      <li>
        <NavLink to="/home" style={myStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/hourly" style={myStyle}>
          Hourly
        </NavLink>
      </li>
      <li>
        <NavLink to="/daily" style={myStyle}>
          Daily
        </NavLink>
      </li>
    </ul>
  );
}

export default NavBar;
