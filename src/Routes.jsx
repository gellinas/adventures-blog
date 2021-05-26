import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import AllPosts from "./AllPosts/AllPosts.jsx";
import Photography from "./Photography/Photography.jsx";
import About from "./About/About.jsx";
import SinglePost from "./SinglePost/SinglePost.jsx";
import Search from "./Search/Search.jsx";
import Admin from "./Admin/Admin.jsx";
import AdminLogin from "./Admin/AdminLogin//AdminLogin.jsx";

function Routes(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/adventures" component={AllPosts} />
        <Route path="/photography" component={Photography} />
        <Route path="/aboutus" component={About} />
        <Route path="/post" component={SinglePost} />
        <Route path="/search" component={Search} />
        <Route path="/admin" component={Admin} />
        <Route path="/adminlogin" component={AdminLogin} />
      </Switch>
    </Router>
  );
}

export default Routes;
