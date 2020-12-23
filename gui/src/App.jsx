import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"


const App = (props) => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
