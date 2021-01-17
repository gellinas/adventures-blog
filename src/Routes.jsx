import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import AllPosts from "./AllPosts/AllPosts.jsx";
import Photography from "./Photography/Photography.jsx";
import About from "./About/About.jsx";
import SinglePost from "./SinglePost/SinglePost.jsx";

function Routes(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/adventures" component={AllPosts} />
        <Route path="/photography" component={Photography} />
        <Route path="/aboutus" component={About} />
        <Route path="/post" component={SinglePost} />
      </Switch>
    </Router>
  );
}

export default Routes;