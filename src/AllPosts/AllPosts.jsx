import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.jsx";
import Carousel from "./components/Carousel/Carousel.jsx";
import CategoryDropdown from "./components/CategoryDropdown/CategoryDropdown.jsx";

import { Pagination, Icon, Dropdown } from "semantic-ui-react";

import { getAdventures } from "../api.js";

import "./AllPosts.scss";

function AllPosts(props) {
  const [adventureData, setAdventureData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const posts = adventureData;

  useEffect(async () => {
    setAdventureData(await getAdventures());
  }, []);

  return (
    <div className="all-posts-container">
      <Navbar {...props} />
      <div className="all-posts-content">
        <div className="carousel-categories-section">
          <div className="section-title">Categories</div>
          <Carousel {...props} />
        </div>

        <div className="adventures-section">
          <div className="adventure-section-heading">
            <div className="section-title">Adventures</div>
            <div className="dropdown-categories-section">
              <CategoryDropdown {...props} />
            </div>
          </div>

          <div className="blog-post-container">
            {posts
              .slice((currentPage - 1) * 9, (currentPage - 1) * 9 + 9)
              .map((item, index) => {
                return (
                  <div className="blog-post-card-div" key={index}>
                    <BlogPostCard
                      blogPostData={item}
                      index={index}
                      {...props}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Pagination
        activePage={currentPage}
        onPageChange={(event, data) => {
          setCurrentPage(data.activePage);
          window.scrollTo(0, 0);
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        pointing
        secondary
        totalPages={posts.length / 9}
      />
      <Footer />
    </div>
  );
}

export default AllPosts;
