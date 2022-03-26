import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FunctionComponent } from "react";
import { useDialog } from "../../contexts/DialogContext";

export interface DialogProps {
  title: string;
  content: JSX.Element;
  acceptButton: {
    label: string;
    onClick: () => void;
  };
}

export const Dialog: FunctionComponent<
  { isOpen: boolean; isLoading: boolean } & DialogProps
> = (props) => {
  const { setIsOpen } = useDialog();

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <MuiDialog
      open={props.isOpen}
      onClose={handleClose}
      fullWidth={true}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(): void => {
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={(): void => {
            props.acceptButton.onClick();
          }}
          loading={props.isLoading}
        >
          {props.acceptButton.label}
        </LoadingButton>
      </DialogActions>
    </MuiDialog>
  );
};
