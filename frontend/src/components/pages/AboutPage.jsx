import { Link } from "react-router-dom";
import Card from "../shared/Card";

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>Loyalty Program App</h1>
        <p>
          Lorem ipsum dolor sit amet. Qui mollitia molestiae in corporis sint id
          voluptas consequatur quo nobis repudiandae. Ea quia nihil sed
          exercitationem distinctio et nesciunt eius sit recusandae natus sed
          perspiciatis rerum nam exercitationem expedita id explicabo tempora.
        </p>
        <p>
            <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
