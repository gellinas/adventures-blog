import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

import "./Home.scss";

function Home(props) {
  return (
    <div className="home-container">
      <Navbar {...props} />
      <div className="home-content">Home</div>
      <Footer />
    </div>
  );
}

export default Home;
