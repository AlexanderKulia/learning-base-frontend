import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({
  component: Component,
  ...routeProps
}: any): JSX.Element => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...routeProps}
      render={(props): JSX.Element => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
};
