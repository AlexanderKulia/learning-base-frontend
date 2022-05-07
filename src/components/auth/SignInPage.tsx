import { css } from "@emotion/react";
import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface FormValues {
  email: string;
  password: string;
}

export const SignInPage = (): JSX.Element => {
  const { handleSnackbar } = useSnackbar();
  const theme = useTheme();
  const history = useHistory();
  const { signIn, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) history.push("/");
  }, []);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
      } catch (error) {
        handleSnackbar("Failed to sign in", "error");
      }
    },
  });

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      css={css`
        position: fixed;
        min-height: 100%;
      `}
    >
      <Grid
        item
        xs={3}
        css={css`
          width: 20%;
        `}
      >
        <Paper
          square
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: ${theme.spacing(4)};
          `}
        >
          <Typography variant="h5" id="title">
            Sign in
          </Typography>
          <form
            css={css`
              width: 100%;
              margin-top: ${theme.spacing(1)};
            `}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
            />
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
            />
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              fullWidth
              css={css`
                margin: ${theme.spacing(3, 0, 2)};
              `}
              id="signIn"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to="/forgot_password"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Do not have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
