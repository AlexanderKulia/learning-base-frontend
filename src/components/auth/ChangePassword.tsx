import { css } from "@emotion/react";
import { Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { AuthApi } from "../../services/api";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const validate = (values: FormValues): Partial<FormValues> => {
  const errors: Partial<FormValues> = {};

  if (!values.oldPassword) {
    errors.oldPassword = "Required";
  }

  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Must be at least 8 characters";
  } else if (values.newPassword.length > 36) {
    errors.newPassword = "newPassword is too long";
  } else if (
    !/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      values.newPassword,
    )
  ) {
    errors.newPassword = "newPassword is too weak";
  }

  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Password does not match";
  }

  return errors;
};

export const ChangePassword = (): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();
  const { handleSnackbar } = useSnackbar();
  const initialValues: FormValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        await AuthApi.changePassword(values.oldPassword, values.newPassword);
        handleSnackbar("Password changed successfully");
        history.push("/");
      } catch (error) {
        handleSnackbar("Failed to change password. Try again", "error");
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      onKeyDown={(e): void => {
        if (e.code === "Tab") {
          e.preventDefault();
        }
      }}
    >
      <Grid item md={6}>
        <Typography
          variant="h5"
          css={css`
            margin-bottom: ${theme.spacing(1)};
          `}
        >
          Change password
        </Typography>

        <TextField
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.oldPassword && formik.errors.oldPassword
              ? true
              : false
          }
          helperText={
            formik.touched.oldPassword && formik.errors.oldPassword
              ? formik.errors.oldPassword
              : null
          }
          margin="normal"
          required
          fullWidth
          label="Old password"
          type="password"
          id="oldPassword"
          name="oldPassword"
          autoComplete="current-password"
        />
        <TextField
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newPassword && formik.errors.newPassword
              ? true
              : false
          }
          helperText={
            formik.touched.newPassword && formik.errors.newPassword
              ? formik.errors.newPassword
              : null
          }
          margin="normal"
          required
          fullWidth
          label="New password"
          type="password"
          id="newPassword"
          name="newPassword"
        />
        <TextField
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
              ? true
              : false
          }
          helperText={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
              ? formik.errors.confirmNewPassword
              : null
          }
          margin="normal"
          required
          fullWidth
          label="Confirm new password"
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="contained"
              css={css`
                margin: ${theme.spacing(3, 0, 2)};
              `}
            >
              Change password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
