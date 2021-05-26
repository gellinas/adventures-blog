import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import FeaturedBlogPostCard from "../components/FeaturedBlogPostCard/FeaturedBlogPostCard.jsx";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.jsx";
import Carousel from "./components/Carousel/Carousel.jsx";

import { Pagination, Icon } from "semantic-ui-react";

import { getAdventures } from "../api.js";

import "./AllPosts.scss";

function AllPosts(props) {
  const [adventureData, setAdventureData] = useState([]);
  const [latestPost = {}, ...posts] = adventureData;

  useEffect(async () => {
    setAdventureData(await getAdventures());
  }, []);

  return (
    <div className="all-posts-container">
      <Navbar {...props} />
      <div className="all-posts-content">
        <div className="categories-section">
          <div className="section-title">Categories</div>
          <Carousel {...props} />
        </div>

        <div className="adventures-section">
          <div className="section-title">Adventures</div>
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
      </div>
      <Pagination
        defaultActivePage={1}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        pointing
        secondary
        totalPages={3}
      />
      <Footer />
    </div>
  );
}

export default AllPosts;
