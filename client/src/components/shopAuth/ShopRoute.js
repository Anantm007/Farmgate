import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { shopIsAuthenticated } from "./index";

const ShopRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !shopIsAuthenticated() ? (
        <Redirect to='/shop/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default ShopRoute;