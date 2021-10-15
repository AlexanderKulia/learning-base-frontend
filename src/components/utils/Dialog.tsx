import React, { FunctionComponent } from "react";
import {
  Dialog as MuiDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDialog } from "../../contexts/DialogContext";

export interface DialogProps {
  title: string;
  content: JSX.Element;
  acceptButton: {
    label: string;
    onClick: () => void;
  };
}

export const Dialog: FunctionComponent<{ isOpen: boolean; isLoading: boolean } & DialogProps> = (props) => {
  const { setIsOpen } = useDialog();

  const handleClose = () => {
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
        <DialogContentText id="dialog-description">{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={() => {
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
