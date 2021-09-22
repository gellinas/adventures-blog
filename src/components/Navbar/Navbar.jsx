import { useState } from "react";
import { Button, Icon, Input, Menu } from "semantic-ui-react";

import "./Navbar.scss";

function Navbar(props) {
  const [navbarInput, setNavbarInput] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeItem, setActiveMenuItem] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const onSearchQuery = (event) => {
    console.log(event.target.value);
    if (props.setSearchQuery) {
      props.setSearchQuery(event.target.value);
    }
    setNavbarInput(event.target.value);
  };

  return (
    <div>
      <div className="website-navbar-container">
        <div className="nav-page-buttons">
          <Button.Group>
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
        </div>
        <div className="home-button-container">
          <Button
            className="home-button"
            onClick={() => props.history.push("/")}
          >
            Advntr Archive
          </Button>
        </div>
        <div className="search-input">
          <Input
            icon={
              <Icon
                name="search"
                link
                onClick={() =>
                  props.history.push("/search", { navbarInput: navbarInput })
                }
              />
            }
            placeholder="Search..."
            value={navbarInput}
            onChange={onSearchQuery}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                props.history.push("/search", { navbarInput: navbarInput });
              }
            }}
          />
        </div>
      </div>

      <div className="sidebar-container">
        <div className="sidebar-header-container">
          <Button
            className="menu-button"
            icon="bars"
            onClick={() => {
              setMenuVisible(!menuVisible);
            }}
          />
          <div className="sidebar-header"> Advntr Archive</div>
        </div>

        {menuVisible && (
          <Menu vertical>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={() => props.history.push("/")}
            />
            <Menu.Item
              name="adventures"
              active={activeItem === "adventures"}
              onClick={() => props.history.push("/adventures")}
            />
            <Menu.Item
              name="photography"
              active={activeItem === "photography"}
              onClick={() => props.history.push("/photography")}
            />
            <Menu.Item
              name="About Us"
              active={activeItem === "aboutus"}
              onClick={() => props.history.push("/aboutus")}
            />
            <Menu.Item>
              <div className="search-input">
                <Input
                  icon={
                    <Icon
                      name="search"
                      link
                      onClick={() =>
                        props.history.push("/search", {
                          navbarInput: navbarInput,
                        })
                      }
                    />
                  }
                  placeholder="Search..."
                  value={navbarInput}
                  onChange={onSearchQuery}
                />
              </div>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </div>
  );
}

export default Navbar;
