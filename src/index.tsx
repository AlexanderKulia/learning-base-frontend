import { CssBaseline } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import dotenv from "dotenv";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { AuthProvider } from "./contexts/AuthContext";
import { DialogProvider } from "./contexts/DialogContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";

dotenv.config();

declare module "@mui/material/styles" {
  interface DefaultTheme extends Theme {}
}

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      light: "#7953d2",
      main: "#4527a0",
      dark: "#000070",
    },
    secondary: {
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        color: "primary",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "primary",
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthProvider>
          <DialogProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </DialogProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>,
  document.getElementById("root"),
);
