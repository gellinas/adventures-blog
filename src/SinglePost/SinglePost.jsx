import "./SinglePost.scss";

import { Label } from "semantic-ui-react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

function SinglePost(props) {
  const { blogPostData } = props.location.state;

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
  const date = new Date(blogPostData.date);
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const newDate = month + ` ` + year.toString();

  return (
    <div className="single-post-container">
      <Navbar {...props} />
      <div className="single-post-content">
        <div
          className="header-image-container"
          style={{
            backgroundImage: `url(${blogPostData.main_image}) `,
          }}
        >
          <div className="header-title-container">
            <div className="header-title">{blogPostData.title}</div>
            <div className="header-date">{newDate}</div>
            <div className="header-subtitle">{blogPostData.sub_title}</div>
          </div>
        </div>
        <div>
          {blogPostData.body.map((item, index) => {
            return (
              <div className="post-body-container">
                <div className="post-text-container">
                  <div className="body-title">{item.body_title}</div>
                  <div className="body-text">{item.body}</div>
                </div>
                <div className="post-image-container">
                  {item.images.map((image, index) => {
                    return <img src={image.src} className="post-image" />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="tags-container">
          {blogPostData.tags.map((value, index) => (
            <Label as="a" basic key={index}>
              {value}
            </Label>
          ))}
        </div>
        <div className="more-posts">More Adventures Like This... </div>
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;
