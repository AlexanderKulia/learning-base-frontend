import React, { ChangeEvent, useState } from "react";
import { makeStyles, Paper, Typography, TextField, Grid, Button, Link } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh"
  },
  paperContainer: { width: "20%" },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

interface FormValues {
  email: string;
  password: string;
}

export const SignInPage = () => {
  const classes = useStyles();
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
    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item xs={3} className={classes.paperContainer}>
        <Paper variant="outlined" square elevation={0} className={classes.paper}>
          <Typography variant="h5">Sign in</Typography>
          <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              variant="outlined"
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
              variant="outlined"
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
              variant="contained"
              color="primary"
              className={classes.submit}
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
