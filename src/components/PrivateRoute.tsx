import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({ component: Component, ...routeProps }: any) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...routeProps}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/signin" />;
      }}
    ></Route>
  );
};
