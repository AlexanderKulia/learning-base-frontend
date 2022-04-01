import { css } from "@emotion/react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useQueryParams } from "../../hooks/useQueryParams";
import { AuthApi } from "../../services/api";
import { Spinner } from "../utils/Spinner";
import { SystemMessage } from "../utils/SystemMessage";

interface FormValues {
  userId: number;
  token: string;
  password: string;
  confirmPassword: string;
}

const validate = (values: FormValues): Partial<FormValues> => {
  const errors: Partial<FormValues> = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters";
  } else if (values.password.length > 36) {
    errors.password = "Password is too long";
  } else if (
    !/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      values.password,
    )
  ) {
    errors.password = "Password is too weak";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};

export const ResetPassword = (): JSX.Element => {
  const token = useQueryParams("token");
  const userId = useQueryParams("id");
  const theme = useTheme();
  const history = useHistory();
  const { handleSnackbar } = useSnackbar();
  const initialValues: FormValues = {
    userId: parseInt(userId),
    token,
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        const res = await AuthApi.resetPassword(
          values.userId,
          values.token,
          values.password,
        );
        handleSnackbar(res.data.message);
        history.push("/signin");
      } catch (error) {
        handleSnackbar("Failed to send password reset", "error");
        history.push("/signin");
      }
    },
  });
  const verifyQuery = useQuery(
    "verifyPasswordToken",
    () => AuthApi.verifyPasswordToken(parseInt(userId), token),
    {
      enabled: !!userId && !!token,
      select: (res) => res.data,
    },
  );

  if (!userId || !token)
    return <SystemMessage content={"Missing token. Please try again"} />;
  if (verifyQuery.isLoading) return <Spinner />;
  if (!verifyQuery.isSuccess || !verifyQuery.data)
    return <SystemMessage content={"Invalid token. Please try again"} />;

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
          <Typography variant="h5">Reset password</Typography>
          <form
            css={css`
              width: 100%;
              margin-top: ${theme.spacing(1)};
            `}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
              margin="normal"
              required
              fullWidth
              label="New password"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
            />
            <TextField
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? true
                  : false
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : null
              }
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
              css={css`
                margin: ${theme.spacing(3, 0, 2)};
              `}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
