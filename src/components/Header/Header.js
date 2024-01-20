import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="App-header">
      <h1>
        <Link to="/">Weather App</Link>
      </h1>
      {/* <div className="highlight">Open Weather API student access expired!!!</div> */}
    </header>
  );
}

export default Header;
