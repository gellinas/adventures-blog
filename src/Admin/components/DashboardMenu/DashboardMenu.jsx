import { useState } from "react";

import { Menu, Divider, Modal, Button, Icon, Header } from "semantic-ui-react";

import "./DashboardMenu.scss";

function DashboardMenu(props) {
  const [openFormChangeModal, setOpenFormChangeModal] = useState(false);
  const [storedActiveMenuItem, setStoredActiveMenuItem] = useState(null);

  const handleMenuModalClick = (event, { name }) => {
    setStoredActiveMenuItem(name);
    setOpenFormChangeModal(true);
  };

  const handleMenuItemClick = () => {
    props.setActiveMenuItem(storedActiveMenuItem);
    setOpenFormChangeModal(false);
  };

  return (
    <div className="dashboard-menu-container">
      <Menu pointing secondary vertical>
        <Menu.Item
          name="dashboard"
          active={props.activeMenuItem === "dashboard"}
          onClick={handleMenuModalClick}
        />

        <Divider />

        <Menu.Menu>
          <Menu.Header>Manage Blog Posts</Menu.Header>
          <Menu.Item
            name="create blog post"
            active={props.activeMenuItem === "create blog post"}
            onClick={handleMenuModalClick}
          />
          <Menu.Item
            name="edit published post"
            active={props.activeMenuItem === "edit published post"}
            onClick={handleMenuModalClick}
          />
        </Menu.Menu>

        <Divider />

        <Menu.Menu>
          <Menu.Header>Manage Photography</Menu.Header>
          <Menu.Item
            name="add photography"
            active={props.activeMenuItem === "add photography"}
            onClick={handleMenuModalClick}
          />
          <Menu.Item
            name="edit photography"
            active={props.activeMenuItem === "edit photography"}
            onClick={handleMenuModalClick}
          />
        </Menu.Menu>
      </Menu>

      <Modal
        onClose={() => setOpenFormChangeModal(false)}
        onOpen={() => setOpenFormChangeModal(true)}
        open={openFormChangeModal}
        size="small"
      >
        <Modal.Header>Would you like to exit this form?</Modal.Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            onClick={() => setOpenFormChangeModal(false)}
          >
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={handleMenuItemClick}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default DashboardMenu;
