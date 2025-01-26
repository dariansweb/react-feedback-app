import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutIconLink = () => {
  return (
    <Link
    to={{
        pathname: "/about",
        state: { from: "about" }
    }}>
      <div className="about-link">
        <FaQuestion size={40} />
      </div>
    </Link>
  );
};

export default AboutIconLink;
