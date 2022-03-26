import { Route, Switch } from "react-router-dom";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";
import { SendVerification } from "./SendVerification";
import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";
import { VerifyEmail } from "./VerifyEmail";

export const LoginContainer = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUpPage}></Route>
      <Route exact path="/signin" component={SignInPage}></Route>
      <Route exact path="/forgot_password" component={ForgotPassword} />
      <Route exact path="/reset_password" component={ResetPassword} />
      <Route exact path="/verify_email" component={VerifyEmail} />
      <Route exact path="/send_verification" component={SendVerification} />
    </Switch>
  );
};
