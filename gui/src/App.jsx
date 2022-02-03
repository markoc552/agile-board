import React from "react";
import { IntlProvider } from "react-intl";
import { Route, Router, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "./history";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const App = () => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000}>
      <IntlProvider>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </Router>
      </IntlProvider>
    </ToastProvider>
  );
};

export default App;
