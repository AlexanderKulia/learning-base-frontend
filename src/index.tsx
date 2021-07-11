import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { App } from "./components/App";
import "./index.css";
import dotenv from "dotenv";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { DialogProvider } from "./contexts/ModalContext";

dotenv.config();

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
  props: {
    MuiButton: {
      disableElevation: true
    },
    MuiAppBar: {
      elevation: 0
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
