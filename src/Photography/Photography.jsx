import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

import "./Photography.scss";

function Photography(props) {
  return (
    <div className="photography-container">
      <Navbar {...props} />
      <div className="photography-content">Photography Archive</div>
      <Footer />
    </div>
  );
}

export default Photography;
