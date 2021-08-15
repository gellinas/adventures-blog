import { useEffect, useState, useRef } from "react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import PhotographyImage from "../components/PhotographyImage/PhotographyImage.jsx";

import { getPhotos } from "../api.js";

import "./Photography.scss";
import { Button, Icon, Ref, Sticky, Rail } from "semantic-ui-react";

function Photography(props) {
  const [photoData, setPhotoData] = useState([]);
  const [photoSet, setPhotoSet] = useState(1);

  useEffect(async () => {
    setPhotoData(await getPhotos());
  }, []);

  const refContainer = useRef(null);

  return (
    <div className="photography-container">
      <Navbar {...props} />
      <Ref innerRef={refContainer}>
        <div className="photography-content">
          <div className="photography-header">Photography Archive</div>
          <div className="photo-images-container">
            {photoData.map((item, index) => {
              if (index < photoSet * 16) {
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

          <div className="load-more">
            <Button
              className="load-more-photos"
              onClick={() => setPhotoSet(photoSet + 1)}
            >
              Load More
            </Button>
          </div>

          <Rail className="scroll-to-top-rail" internal position="right">
            <Sticky context={refContainer} pushing>
              <Button
                icon
                className="return-to-top"
                onClick={() => window.scrollTo(0, 0)}
              >
                <Icon name="angle double up" />
              </Button>
            </Sticky>
          </Rail>
        </div>
      </Ref>
      <Footer />
    </div>
  );
}

export default Photography;
