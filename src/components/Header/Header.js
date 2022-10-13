import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="App-header">
      <h1>
        <Link to="/">Weather App</Link>
      </h1>
    </header>
  );
}

export default Header;
