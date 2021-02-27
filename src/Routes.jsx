import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import AllPosts from "./AllPosts/AllPosts.jsx";
import Photography from "./Photography/Photography.jsx";
import About from "./About/About.jsx";
import SinglePost from "./SinglePost/SinglePost.jsx";
import Search from "./Search/Search.jsx";

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
      </Switch>
    </Router>
  );
}

export default Routes;
