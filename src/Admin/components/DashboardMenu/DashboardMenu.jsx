import { Menu, Divider } from "semantic-ui-react";

import "./DashboardMenu.scss";

function DashboardMenu(props) {
  const handleMenuItemClick = (event, { name }) => {
    props.setActiveMenuItem(name);
  };

  return (
    <div className="dashboard-menu-container">
      <Menu pointing secondary vertical>
        <Menu.Item
          name="dashboard"
          active={props.activeMenuItem === "dashboard"}
          onClick={handleMenuItemClick}
        />

        <Divider />

        <Menu.Menu>
          <Menu.Header>Manage Blog Posts</Menu.Header>
          <Menu.Item
            name="create blog post"
            active={props.activeMenuItem === "create blog post"}
            onClick={handleMenuItemClick}
          />
          <Menu.Item
            name="edit published post"
            active={props.activeMenuItem === "edit published post"}
            onClick={handleMenuItemClick}
          />
        </Menu.Menu>

        <Divider />

        <Menu.Menu>
          <Menu.Header>Manage Photography</Menu.Header>
          <Menu.Item
            name="add photography"
            active={props.activeMenuItem === "add photography"}
            onClick={handleMenuItemClick}
          />
          <Menu.Item
            name="edit photography"
            active={props.activeMenuItem === "edit photography"}
            onClick={handleMenuItemClick}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default DashboardMenu;
