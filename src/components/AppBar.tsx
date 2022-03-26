import { css } from "@emotion/react";
import {
  Alert,
  AlertTitle,
  AppBar as MuiAppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AppBar = (): JSX.Element => {
  const theme = useTheme();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = (): void => {
    try {
      logout();
      history.push("/signin");
    } catch {
      alert("Failed to log out");
    }
  };

  const handleEmailVerification = (): JSX.Element | null => {
    if (currentUser && !currentUser.emailVerified)
      return (
        <Alert
          severity="info"
          css={css`
            position: fixed;
            left: 50%;
            transform: translate(-50%);
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
    return null;
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
            >
              Learning Base
            </Link>
          </Box>
          <Typography variant="h6">{JSON.stringify(currentUser)}</Typography>
          <Button variant="text" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </MuiAppBar>
    </>
  );
};
