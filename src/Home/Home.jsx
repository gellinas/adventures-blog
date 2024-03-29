import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HeroHeader from "./components/HeroHeader.jsx";
import FeaturedBlogPostCard from "../components/FeaturedBlogPostCard/FeaturedBlogPostCard.jsx";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.jsx";
import PhotographyImage from "../components/PhotographyImage/PhotographyImage.jsx";

import { Button } from "semantic-ui-react";
import LoadingOverlay from "react-loading-overlay";
import PropagateLoader from "react-spinners/PropagateLoader";
import { isEmpty } from "lodash";

import { getAdventures, getPhotos } from "../api.js";

import "./Home.scss";

function Home(props) {
  const [adventureData, setAdventureData] = useState([]);
  const [photoData, setPhotoData] = useState([]);

  const [latestPost = {}, ...posts] = adventureData;

  useEffect(async () => {
    setAdventureData(await getAdventures());
    setPhotoData(await getPhotos());
  }, []);

  return (
    <div className="home-container">
      <LoadingOverlay
        active={isEmpty(adventureData)}
        spinner={<PropagateLoader color="#335B43" size="20px" />}
        styles={{
          wrapper: {
            overflow: isEmpty(adventureData) ? "hidden" : "unset",
          },
          overlay: (base) => {
            return {
              ...base,
              background: "#2b2b2b",
            };
          },
        }}
      >
        <Navbar {...props} />
        <div className="home-content">
          <HeroHeader />
          <div className="recent-adventures-section">
            <div className="section-title">Recent Adventures</div>
            <FeaturedBlogPostCard latestPost={latestPost} {...props} />
            <div className="blog-post-container">
              {posts.map((item, index) => {
                if (index <= 5) {
                  return (
                    <div className="blog-post-card-div" key={index}>
                      <BlogPostCard
                        blogPostData={item}
                        index={index}
                        {...props}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="see-more">
            <Button
              className="see-more-button"
              onClick={() => {
                props.history.push("/adventures");
                window.scrollTo(0, 0);
              }}
            >
              More Adventures
            </Button>
          </div>

          <div className="photo-archive-section">
            <div className="section-title">Recent Photography</div>
            <div className="photo-images-container">
              {photoData.map((item, index) => {
                if (index <= 5) {
                  return (
                    <div key={index}>
                      <PhotographyImage
                        photoData={item}
                        index={index}
                        {...props}
                        size="big"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="see-more">
            <Button
              className="see-more-button"
              onClick={() => {
                props.history.push("/photography");
                window.scrollTo(0, 0);
              }}
            >
              More Photogragphy
            </Button>
          </div>
        </div>
        <Footer />
      </LoadingOverlay>
    </div>
  );
}

export default Home;
