import { createContext, useState, useContext, FunctionComponent } from "react";
import { Snackbar } from "@mui/material";

interface SnackbarContextValue {
  handleSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export interface SnackbarState {
  isOpen: boolean;
  message: string;
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be within SnackbarProvider");
  }

  return context;
};

export const SnackbarProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<SnackbarState>({
    isOpen: false,
    message: ""
  });
  const { isOpen, message } = state;

  const handleSnackbar = (message: string) => {
    setState({ ...state, message, isOpen: true });
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    // prevents snackbar from closing on clickaway (anywhere in the app)
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, isOpen: false });
  };

  const value = { handleSnackbar };

  return (
    <SnackbarContext.Provider value={value}>
      {isOpen && (
        <Snackbar
          open={isOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message={message}
          key={message}
        />
      )}
      {children}
    </SnackbarContext.Provider>
  );
};
