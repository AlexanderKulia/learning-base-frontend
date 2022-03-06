import React, { ChangeEvent, useState } from "react";
import { Paper, Typography, TextField, Grid, Button, Link, useTheme } from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";

interface FormValues {
  email: string;
  password: string;
}

export const SignInPage = () => {
  const theme = useTheme();
  const { signIn } = useAuth();
  const history = useHistory();
  const initialValues: FormValues = {
    email: "",
    password: ""
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
      } catch (error) {
        alert("Failed to sign in");
      }
    }
  });

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      css={css`
        min-height: 100vh;
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
          <Typography variant="h5">Sign in</Typography>
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
