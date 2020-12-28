import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

import "./About.scss";

function About(props) {
  return (
    <div className="about-container">
      <Navbar {...props} />
      <div className="about-content">About</div>
      <Footer />
    </div>
  );
}

export default About;
