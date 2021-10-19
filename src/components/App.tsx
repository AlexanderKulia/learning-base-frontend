import React, { FunctionComponent } from "react";
import { Switch, useLocation, Redirect, Route } from "react-router-dom";
import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer";
import { NoteList } from "./notes/NoteList";
import { NoteCreate } from "./notes/NoteCreate";
import { NoteEdit } from "./notes/NoteEdit";
import { MainContainer } from "./MainContainer";
import { PrivateRoute } from "./PrivateRoute";
import { LoginContainer } from "./auth/LoginContainer";
import { AppContainer } from "./AppContainer";
import { TagList } from "./tags/TagList";

export const App: FunctionComponent = (): JSX.Element => {
  const { pathname } = useLocation();
  const excludeNavFrom = ["/signin", "/signup"];

  return (
    <>
      <LoginContainer />
      <AppContainer>
        {!excludeNavFrom.includes(pathname) && <AppBar />}
        {!excludeNavFrom.includes(pathname) && <Drawer />}
        <MainContainer>
          <Switch>
            <Route exact path="/">
              <Redirect to="/notes" />
            </Route>
            <PrivateRoute exact path="/notes" component={NoteList} />
            <PrivateRoute exact path="/notes/new" component={NoteCreate} />
            <PrivateRoute exact path="/notes/:id" component={NoteEdit} />
            <PrivateRoute exact path="/tags" component={TagList} />
          </Switch>
        </MainContainer>
      </AppContainer>
    </>
  );
};
