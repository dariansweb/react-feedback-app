import Card from "../components/shared/Card";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Card title="About">
      <div className="about">
        <h1>About this Project</h1>
      </div>
      <p>This is a simple app to collect feedback from users.</p>
      <p>
        <strong>Version: </strong> 1.0.0
      </p>
      <p>
        <strong>Author:</strong> Darian Ross
      </p>
      <Link to="/">
        Go Back
      </Link>
    </Card>
  );
};

export default About;
