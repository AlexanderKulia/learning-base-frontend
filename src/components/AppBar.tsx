import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Link, useTheme, Box } from "@mui/material";
import { css } from "@emotion/react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AppBar = () => {
  const theme = useTheme();
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
    <MuiAppBar
      position="fixed"
      css={css`
        z-index: ${theme.zIndex.drawer + 1};
        flex-row: 1;
      `}
    >
      <Toolbar>
        <Box
          css={css`
            flex-grow: 1;
          `}
        >
          <Link color="inherit" variant="h6" underline="none" component={RouterLink} to="/">
            Learning Base
          </Link>
        </Box>
        <Typography variant="h6">{JSON.stringify(currentUser)}</Typography>
        <Button variant="text" color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};
