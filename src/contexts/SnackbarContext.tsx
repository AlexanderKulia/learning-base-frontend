import { css } from "@emotion/react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface SnackbarContextValue {
  handleSnackbar: (message: string, severity?: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined,
);

export interface SnackbarState {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
}

export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be within SnackbarProvider");
  }

  return context;
};

interface SnackbarProps {
  children: ReactNode;
}

const defaultState: SnackbarState = {
  isOpen: false,
  message: "",
  severity: "success",
};

export const SnackbarProvider = ({ children }: SnackbarProps): JSX.Element => {
  const [state, setState] = useState<SnackbarState>(defaultState);
  const { isOpen, message, severity } = state;

  const handleSnackbar = useCallback(
    (message: string, severity?: AlertColor): void => {
      setState({
        ...state,
        message,
        isOpen: true,
        severity: severity ? severity : defaultState.severity,
      });
    },
    [],
  );

  const handleSnackbarClose = (
    _event: Event | React.SyntheticEvent<any, Event>,
    reason?: string,
  ): void => {
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
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          key={message}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={severity}
            css={css`
              width: 100%;
            `}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </SnackbarContext.Provider>
  );
};
