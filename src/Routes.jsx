import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";

function Routes(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  );
}

export default Routes;
