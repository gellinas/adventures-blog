import { useState, useEffect } from "react";
import { Label } from "semantic-ui-react";

import "./SinglePost.scss";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.jsx";
import { getAdventures } from "../api.js";

function SinglePost(props) {
  const [adventureData, setAdventureData] = useState([]);
  const { blogPostData } = props.location.state;

  useEffect(async () => {
    setAdventureData(await getAdventures());
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateOfAdventure = new Date(blogPostData.date);
  const monthOfAdventure = monthNames[dateOfAdventure.getUTCMonth()];
  const yearofAdventure = dateOfAdventure.getUTCFullYear();
  const convertedDateOfAdventure =
    monthOfAdventure + ` ` + yearofAdventure.toString();

  const datePosted = new Date(blogPostData.date_posted);
  const monthPosted = monthNames[datePosted.getUTCMonth()];
  const yearPosted = datePosted.getUTCFullYear();
  const updatedDatePosted = monthPosted + ` ` + yearPosted.toString();

  const showSimilarPosts = () => {
    const similarPosts = adventureData.filter(
      (adventure) =>
        adventure.id !== blogPostData.id &&
        blogPostData.categories.some((category) =>
          adventure.categories.includes(category)
        )
    );
    if (similarPosts.length > 0) {
      return (
        <div className="more-posts">
          <div className="more-posts-header">More Adventures Like This... </div>
          <div className="more-posts-container">
            {similarPosts.map((item, index) => {
              return (
                <div className="blog-post-card-div" key={index}>
                  <BlogPostCard blogPostData={item} index={index} {...props} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="single-post-container">
      <Navbar {...props} />
      <div className="single-post-content">
        <div
          className="header-image-container"
          style={{
            backgroundImage: `url(https://adventures-archive.s3.amazonaws.com/${blogPostData.main_image}) `,
          }}
        >
          <div className="header-title-container">
            <div className="header-title">{blogPostData.title}</div>
            <div className="header-date">{convertedDateOfAdventure}</div>
            <div className="header-subtitle">{blogPostData.sub_title}</div>
          </div>
        </div>
        <div>
          {blogPostData.post_section.map((item, index) => {
            return (
              <div className="post-body-container" key={index}>
                <div className="post-text-container">
                  <div className="body-title">{item.section_title}</div>
                  <div className="body-text">{item.section_text}</div>
                </div>
                <div className="post-image-container">
                  {item.images.map((image, index) => {
                    return (
                      <div key={index}>
                        {image.src && <img src={`https://adventures-archive.s3.amazonaws.com/${image.src}`} className="post-image" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="date-updated">Last updated: {updatedDatePosted}</div>
        <div className="tags-container">
          {blogPostData.tags.map((value, index) => (
            <Label
              as="a"
              basic
              key={index}
              onClick={() =>
                props.history.push("/search", { blogPostCardTag: value })
              }
            >
              {value}
            </Label>
          ))}
        </div>
        {showSimilarPosts()}
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;
