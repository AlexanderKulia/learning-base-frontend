import { css } from "@emotion/react";
import { AccountCircle } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";

export const AppBar = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const theme = useTheme();
  const { handleSnackbar } = useSnackbar();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = (): void => {
    try {
      logout();
      history.push("/signin");
    } catch {
      handleSnackbar("Failed to log out", "error");
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleEmailVerification = (): JSX.Element | null => {
    if (currentUser && currentUser.emailVerified) return null;

    return (
      <Alert
        severity="info"
        css={css`
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          z-index: ${theme.zIndex.drawer + 2};
        `}
      >
        <AlertTitle>
          Verification link has been sent to your email address
        </AlertTitle>
        Please click on the link from the email or{" "}
        <a
          href={`${process.env.REACT_APP_FRONTEND_URL}/send_verification`}
          target="_blank"
          rel="noreferrer"
        >
          click here
        </a>{" "}
        if you did not receive the email
      </Alert>
    );
  };

  return (
    <>
      {handleEmailVerification()}
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
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              component={RouterLink}
              to="/"
              id="home"
            >
              Learning Base
            </Link>
          </Box>
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
            id="menu"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} id="changePassword">
              <Link
                color="inherit"
                underline="none"
                component={RouterLink}
                to="/change_password"
              >
                Change password
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout} id="logout">
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </MuiAppBar>
    </>
  );
};
