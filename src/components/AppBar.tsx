import React, { useEffect } from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: { zIndex: theme.zIndex.drawer + 1, flexGrow: 1 },
  titleContainer: { flexGrow: 1 },
  homeLink: { color: "#ffffff", textDecoration: "none" }
}));

export const AppBar = () => {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    try {
      logout();
      history.push("/signin");
    } catch {
      alert("Failed to log out");
    }
  };

  return (
    <MuiAppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <div className={classes.titleContainer}>
          <Link color="inherit" variant="h6" underline="none" component={RouterLink} to="/">
            Learning Base
          </Link>
        </div>
        <Typography variant="h6">{JSON.stringify(currentUser)}</Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};
