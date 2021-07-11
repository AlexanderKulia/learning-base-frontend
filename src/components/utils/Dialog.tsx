import React from "react";
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { useDialog } from "../../contexts/ModalContext";

interface DialogProps {
  open: boolean;
  title: string;
  content: string;
  cancelButton: string;
  cancelButtonAction: () => void;
  acceptButton: string;
  acceptButtonAction: () => void;
}

export const Dialog = (props: DialogProps) => {
  const { setIsOpen } = useDialog();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <MuiDialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setIsOpen(false);
            props.cancelButtonAction();
          }}
          color="primary"
        >
          {props.cancelButton}
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            props.acceptButtonAction();
          }}
          color="primary"
        >
          {props.acceptButton}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
