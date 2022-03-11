import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("user") != null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute