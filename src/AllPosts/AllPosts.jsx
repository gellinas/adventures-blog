import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

import "./AllPosts.scss";

function AllPosts(props) {
  return (
    <div className="all-posts-container">
      <Navbar {...props} />
      <div className="all-posts-content">Adventures</div>
      <Footer />
    </div>
  );
}

export default AllPosts;
