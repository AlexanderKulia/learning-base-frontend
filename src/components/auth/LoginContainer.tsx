import React from "react";
import { Switch, Route } from "react-router-dom";
import { SignUpPage } from "./SignUpPage";
import { SignInPage } from "./SignInPage";

export const LoginContainer = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUpPage}></Route>
      <Route exact path="/signin" component={SignInPage}></Route>
    </Switch>
  );
};
