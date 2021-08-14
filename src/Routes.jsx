import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home/Home.jsx";
import AllPosts from "./AllPosts/AllPosts.jsx";
import Photography from "./Photography/Photography.jsx";
import About from "./About/About.jsx";
import SinglePost from "./SinglePost/SinglePost.jsx";
import Search from "./Search/Search.jsx";
import Admin from "./Admin/Admin.jsx";
import AdminLogin from "./Admin/AdminLogin/AdminLogin.jsx";

function Routes(props) {
  const [adminToken, setAdminToken] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/adventures" component={AllPosts} />
        <Route path="/photography" component={Photography} />
        <Route path="/aboutus" component={About} />
        <Route path="/post" component={SinglePost} />
        <Route path="/search" component={Search} />
        <Route 
          path="/admin" 
          render={(props) => <Admin {...props} accessToken={adminToken} setAdminToken={setAdminToken}/>}
        />
        <Route path="/adminlogin" component={(props) => <AdminLogin {...props} setAdminToken={setAdminToken} />} />
      </Switch>
    </Router>
  );
}

export default Routes;
