import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated() ? (
        <Redirect to="/user/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PrivateRoute;
