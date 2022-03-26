import { FunctionComponent } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AppBar } from "./AppBar";
import { AppContainer } from "./AppContainer";
import { LoginContainer } from "./auth/LoginContainer";
import { Drawer } from "./Drawer";
import { Home } from "./home/Home";
import { MainContainer } from "./MainContainer";
import { NoteCreate } from "./notes/NoteCreate";
import { NoteEdit } from "./notes/NoteEdit";
import { NoteList } from "./notes/NoteList";
import { PrivateRoute } from "./PrivateRoute";
import { TagList } from "./tags/TagList";
import { ErrorBoundary } from "./utils/ErrorBoundary";

export const App: FunctionComponent = (): JSX.Element => {
  const { pathname } = useLocation();
  const excludeNavFrom = [
    "/signin",
    "/signup",
    "/forgot_password",
    "/reset_password",
    "/verify_email",
    "/send_verification",
  ];

  return (
    <>
      <ErrorBoundary>
        <LoginContainer />
        <AppContainer>
          {!excludeNavFrom.includes(pathname) && <AppBar />}
          {!excludeNavFrom.includes(pathname) && <Drawer />}
          <MainContainer>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <PrivateRoute exact path="/notes" component={NoteList} />
              <PrivateRoute exact path="/notes/new" component={NoteCreate} />
              <PrivateRoute exact path="/notes/:id" component={NoteEdit} />
              <PrivateRoute exact path="/tags" component={TagList} />
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
          </MainContainer>
        </AppContainer>
      </ErrorBoundary>
    </>
  );
};
