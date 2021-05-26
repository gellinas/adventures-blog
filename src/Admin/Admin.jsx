import { useState } from "react";

import DashboardMenu from "./components/DashboardMenu/DashboardMenu.jsx";
import AddPhotography from "./components/ManagePhotography/AddPhotography/AddPhotography.jsx";
import CreateBlogPost from "./components/ManageBlogPosts/CreateBlogPost/CreateBlogPost.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import EditBlogPost from "./components/ManageBlogPosts/EditBlogPost/EditBlogPost.jsx";
import EditPhotography from "./components/ManagePhotography/EditPhotography/EditPhotography.jsx";

import "./Admin.scss";

function Admin(props) {
  //change default state, setting for testing
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleActiveComponent = () => {
    if (activeMenuItem === "dashboard") {
      return <Dashboard />;
    }
    if (activeMenuItem === "create blog post") {
      return <CreateBlogPost />;
    }
    if (activeMenuItem === "edit published post") {
      return <EditBlogPost />;
    }
    if (activeMenuItem === "add photography") {
      return <AddPhotography />;
    }
    if (activeMenuItem === "edit photography") {
      return <EditPhotography />;
    }
  };

  return (
    <div className="admin-page-container">
      <DashboardMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      <div className="active-component">{handleActiveComponent()}</div>
    </div>
  );
}

export default Admin;
