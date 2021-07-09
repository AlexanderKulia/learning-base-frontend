import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { App } from "./components/App";
import "./index.css";
import dotenv from "dotenv";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

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
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
