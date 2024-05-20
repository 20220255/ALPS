import { Link } from "react-router-dom";

function AboutIconLink() {
  return (
    <div className="about-link">
      <div style={{marginRight: '1rem'}}>
        <Link to="/trivia-quiz">Trivia</Link>
      </div>
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
