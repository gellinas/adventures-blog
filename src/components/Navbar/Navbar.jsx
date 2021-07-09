import { useState } from "react";
import { Button, Icon, Input } from "semantic-ui-react";

import "./Navbar.scss";

function Navbar(props) {
  const [navbarInput, setNavbarInput] = useState("");

  const onSearchQuery = (event) => {
    console.log(event.target.value)
    if (props.setSearchQuery) {
      props.setSearchQuery(event.target.value);
    }
    setNavbarInput(event.target.value);
  };

  return (
    <div className="navbar-container">
      <Button className="home-button" onClick={() => props.history.push("/")}>
        Advntr Archive
      </Button>
      <Button.Group className="nav-group-buttons">
        <Button
          className="nav-button"
          onClick={() => props.history.push("/adventures")}
        >
          Explore
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
      <Input
        icon={
          <Icon
            name="search"
            link
            onClick={() => {
              console.log('clicked')
              props.history.push("/search", { navbarInput: navbarInput })
            }}
          />
        }
        placeholder="Search..."
        value={navbarInput}
        onChange={onSearchQuery}
      />
    </div>
  );
}

export default Navbar;
