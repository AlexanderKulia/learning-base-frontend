import React, { FunctionComponent } from "react";
import { Switch, useLocation } from "react-router-dom";
import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer";
import { NoteList } from "./notes/NoteList";
import { NoteCreate } from "./notes/NoteCreate";
import { NoteEdit } from "./notes/NoteEdit";
import { NoteDelete } from "./notes/NoteDelete";
import { MainContainer } from "./MainContainer";
import { PrivateRoute } from "./PrivateRoute";
import { LoginContainer } from "./auth/LoginContainer";
import { AppContainer } from "./AppContainer";

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
            <PrivateRoute exact path="/" component={NoteList}></PrivateRoute>
            <PrivateRoute exact path="/notes/new" component={NoteCreate}></PrivateRoute>
            <PrivateRoute exact path="/notes/:id" component={NoteEdit}></PrivateRoute>
          </Switch>
        </MainContainer>
      </AppContainer>
    </>
  );
};
