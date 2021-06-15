import { useState } from "react";
import { Button, Form, Message, Icon } from "semantic-ui-react";

import "./Footer.scss";

function Footer(props) {
  const [messageVisible, setMessageVisible] = useState(false);

  const onInstagramClick = () => {
    window.open("https://www.instagram.com/advntr.archive/", "_blank");
  };

  //Subscription Feature To Come Later
  // const onSubscribeClick = () => {
  //   setMessageVisible(true);
  // };

  // const subscribeSuccess = () => {
  //   if (messageVisible === true) {
  //     return (
  //       <Message
  //         className="subscribe-message"
  //         size="tiny"
  //         onDismiss={() => setMessageVisible(false)}
  //         header="Thank you for Subscribing!"
  //         content="You'll be notified when we post new adventures"
  //       />
  //     );
  //   }
  // };

  return (
    <div className="footer-container">
      <div className="footer-message">Don't miss an adventure with us...</div>
      {/* <Form className="subscribe-form">
        <Form.Input placeholder="Email Address" />
        <Button onClick={onSubscribeClick}>Subscribe</Button>
      </Form>
      {subscribeSuccess()} */}
      <div className="footer-icons">
        <Icon link name="instagram" onClick={() => onInstagramClick()} />
        <a href="mailto:hello@advntrarchive.com">
          <Icon name="mail outline" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
