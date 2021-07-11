import React from "react";
import { makeStyles, Paper, Typography, Grid, TextField, Button, Link } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";

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

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters";
  } else if (values.password.length > 36) {
    errors.password = "Password is too long";
  } else if (!/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(values.password)) {
    errors.password = "Password is too weak";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpPage = () => {
  const classes = useStyles();
  const { signUp } = useAuth();
  const history = useHistory();
  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: ""
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        await signUp(values.email, values.password);
        history.push("/signin");
      } catch (error) {
        alert("Failed to create an account");
      }
    }
  });

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item xs={3} className={classes.paperContainer}>
        <Paper variant="outlined" square elevation={0} className={classes.paper}>
          <Typography variant="h5">Sign up</Typography>
          <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
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
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password ? true : false}
              helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
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
            <TextField
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
            />
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
