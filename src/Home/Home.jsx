import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HeroHeader from "./components/HeroHeader.jsx";
import FeaturedBlogPostCard from "../components/FeaturedBlogPostCard/FeaturedBlogPostCard.jsx";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.jsx";

import { Button } from "semantic-ui-react";

import dummyData from "../data/dummy-adventures.json";
import "./Home.scss";

function Home(props) {
  console.log(dummyData);

  const [latestPost, ...posts] = dummyData;

  return (
    <div className="home-container">
      <Navbar {...props} />
      <div className="home-content">
        <HeroHeader />
        <div className="recent-adventures-section">
          <div className="section-title">Recent Adventures</div>
          <FeaturedBlogPostCard latestPost={latestPost} {...props} />
          <div className="blog-post-container">
            {posts.map((item, index) => {
              return (
                <div className="blog-post-card-div" key={index}>
                  <BlogPostCard blogPostData={item} index={index} {...props} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="see-more">
          <Button
            className="see-more-button"
            onClick={() => props.history.push("/adventures")}
          >
            More Adventures
          </Button>
        </div>

        <div className="photo-archive-section">
          <div className="section-title">Photography Archive</div>
        </div>
        <div className="see-more">
          <Button
            className="see-more-button"
            onClick={() => props.history.push("/photography")}
          >
            More Photogragphy
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
