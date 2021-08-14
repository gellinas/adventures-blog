import { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import SkewLoader from "react-spinners/SkewLoader";

import DashboardMenu from "./components/DashboardMenu/DashboardMenu.jsx";
import AddPhotography from "./components/ManagePhotography/AddPhotography/AddPhotography.jsx";
import CreateBlogPost from "./components/ManageBlogPosts/CreateBlogPost/CreateBlogPost.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import EditBlogPost from "./components/ManageBlogPosts/EditBlogPost/EditBlogPost.jsx";
import EditPhotography from "./components/ManagePhotography/EditPhotography/EditPhotography.jsx";
import { refreshLogin } from "../api";
import Cookies from 'js-cookie';

import "./Admin.scss";

function Admin(props) {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [fetchingNewAccessToken, setFetchingNewAccessToken] = useState(false);
  // const [accessToken, setAccessToken] = useState(false);

  useEffect(async () => {
    if (!props.accessToken || !props.location.state.accessToken) {
      setFetchingNewAccessToken(true)
      const response = await refreshLogin(props.accessToken);
      if (response.access_token) {
        props.setAdminToken(response.access_token);
        setFetchingNewAccessToken(false)
      } else {
        props.history.push('/')
      }
    }
  }, []);

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
      <LoadingOverlay
        active={!props.accessToken || fetchingNewAccessToken}
        spinner={<SkewLoader color="#335B43" size="55px" />}
        styles={{
          wrapper: {
            width: '100%'
          },
          overlay: (base) => {
            return {
              ...base,
              background: '#2b2b2b',
            }
          }
        }}
      >
        <DashboardMenu
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />
        <div className="active-component">{handleActiveComponent()}</div>
      </LoadingOverlay>
    </div>
  );
}

export default Admin;
