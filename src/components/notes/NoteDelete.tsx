import React, { useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useDialog } from "../../contexts/DialogContext";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface DeleteNoteProps {
  id: number;
  title: string;
}

export const NoteDelete = ({ id, title }: DeleteNoteProps) => {
  const { handleDialog, handleDialogClose } = useDialog();
  const { handleSnackbar } = useSnackbar();

  return (
    <DeleteOutline
      onClick={() => {
        handleDialog({
          title: "Delete note?",
          content: (
            <>
              {"This action will delete note "}
              <b>{title}</b>
            </>
          ),
          acceptButton: {
            label: "Delete",
            onClick: () => {
              handleDialogClose(() => {
                handleSnackbar(`Deleted note with id ${id}`);
              });
            }
          }
        });
      }}
    />
  );
};
