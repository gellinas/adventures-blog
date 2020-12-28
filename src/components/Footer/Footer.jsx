import { useState } from "react";
import { Button, Form, Message, Icon } from "semantic-ui-react";

import "./Footer.scss";

function Footer(props) {
  const [messageVisible, setMessageVisible] = useState(false);

  const onSubscribeClick = () => {
    setMessageVisible(true);
  };

  const subscribeSuccess = () => {
    if (messageVisible === true) {
      return (
        <Message
          className="subscribe-message"
          size="tiny"
          onDismiss={() => setMessageVisible(false)}
          header="Thank you for Subscribing!"
          content="You'll be notified when we post new adventures"
        />
      );
    }
  };

  return (
    <div className="footer-container">
      <div className="footer-message">Don't miss an adventure with us...</div>
      <Form className="subscribe-form">
        <Form.Input placeholder="Email Address" />
        <Button onClick={onSubscribeClick}>Subscribe</Button>
      </Form>
      {subscribeSuccess()}
      <div className="footer-icons">
        <Icon link name="instagram" />
        <Button>
          <Icon name="mail outline" />
        </Button>
      </div>
    </div>
  );
}

export default Footer;
