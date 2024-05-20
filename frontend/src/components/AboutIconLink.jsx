import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";

function AboutIconLink() {
  return (
    <div className="about-link">
      <div style={{marginRight: '1rem'}}>
        <Link to="/weather">Weather</Link>
      </div>
      <div>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
}

export default AboutIconLink;
