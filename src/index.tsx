import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import dotenv from "dotenv";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { DialogProvider } from "./contexts/ModalContext";

dotenv.config();

declare module "@mui/material/styles" {
  interface DefaultTheme extends Theme {}
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#9a67ea",
      main: "#673ab7",
      dark: "#320b86"
    },
    secondary: {
      light: "#5e92f3",
      main: "#1565c0",
      dark: "#003c8f"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      }
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <DialogProvider>
          <App />
        </DialogProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
