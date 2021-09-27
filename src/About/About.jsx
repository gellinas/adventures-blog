import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

import { Container, Icon, Image } from "semantic-ui-react";

import "./About.scss";

function About(props) {
  const onInstagramClick = () => {
    window.open("https://www.instagram.com/advntr.archive/", "_blank");
  };

  return (
    <div className="about-container">
      <Navbar {...props} />
      <div className="about-content">
        <Image
          className="about-us-image"
          src="https://adventures-archive.s3.amazonaws.com/32FC7ECA-FB34-4A83-BC8D-15E6FE9CBB31.JPG"
        />
        <div className="about-text">
          <div className="about-header">Our Story</div>
          <Container text fluid className="our-story-container">
            <p>
              Hello fellow adventurers! After a few years of traveling together,
              we decided to create this space to archive our memories and
              adventures. We share a love for food, photography, and exploring
              new spaces. We believe adventures can be found anywhere, from
              neighborhoods close to home or cities across the globe.
            </p>
            <p>
              A few of our shared hobbies include: bouldering and rock climbing,
              shooting photography with our film and digital cameras, and
              finding delicious places to eat. If you happen to find yourself on
              our site, we hope our adventures inspire you to go out on your own
              adventures and create cherished memories.
            </p>
          </Container>
          <Container
            text
            textAlign="center"
            fluid
            className="signature-container"
          >
            <p>~ Dannah and Denny</p>
          </Container>

          <div className="contact-us-info">
            <div className="contact-us-heading">Contact Us</div>
            <div
              className="instagram-handle"
              onClick={() => onInstagramClick()}
            >
              <Icon name="instagram" size="large" />
              advntr.archive
            </div>
            <a className="email" href="mailto:hello@advntrarchive.com">
              <Icon name="mail outline" size="large" /> hello@advntrarchive.com
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
