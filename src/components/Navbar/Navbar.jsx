import { Button, Search, Icon } from "semantic-ui-react";

import "./Navbar.scss";

function Navbar(props) {
  return (
    <div className="navbar-container">
      <Button className="home-button" onClick={() => props.history.push("/")}>
        DxD
      </Button>
      <Button.Group className="nav-group-buttons">
        <Button
          className="nav-button"
          onClick={() => props.history.push("/adventures")}
        >
          Adventures
        </Button>
        <Button
          className="nav-button"
          onClick={() => props.history.push("/photography")}
        >
          Photography
        </Button>
        <Button
          className="nav-button"
          onClick={() => props.history.push("/aboutus")}
        >
          About Us
        </Button>
      </Button.Group>
      <Button className="search-button">
        <Icon name="search" />
      </Button>
    </div>
  );
}

export default Navbar;
