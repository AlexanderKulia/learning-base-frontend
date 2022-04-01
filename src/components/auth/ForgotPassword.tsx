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
import { useHistory } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { AuthApi } from "../../services/api";

interface FormValues {
  email: string;
}

export const ForgotPassword = (): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();
  const { handleSnackbar } = useSnackbar();
  const initialValues: FormValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const res = await AuthApi.forgotPassword(values.email);
        handleSnackbar(res.data.message);
        history.push("/signin");
      } catch (error) {
        handleSnackbar("Failed to send password reset", "error");
        history.push("/signin");
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
          <Typography variant="h5">Send password reset</Typography>
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
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              fullWidth
              css={css`
                margin: ${theme.spacing(3, 0, 2)};
              `}
            >
              Reset
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
