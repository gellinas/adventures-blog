import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import PhotographyImage from "../components/PhotographyImage/PhotographyImage.jsx";

import dummyPhotos from "../data/dummy-photos.json";

import "./Photography.scss";

function Photography(props) {
  return (
    <div className="photography-container">
      <Navbar {...props} />
      <div className="photography-content">
        <div className="photography-header">Photogragphy Archive</div>
        <div className="photo-images-container">
          {dummyPhotos.map((item, index) => {
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
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Photography;
