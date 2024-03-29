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
          exercitationem distinctio et nesciunt eius sit recusandae natus.
        </p>
        <iframe
          title="LG Washing Machines"
          src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FAbans.lk%2Fvideos%2F1099174626790978%2F&show_text=false&width=560&t=0"
          width="250"
          height="165"
          style={{ border: "none", overflow: "hidden" }}
          frameborder="0"
          allowfullscreen="false"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen="true"
        />

        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
