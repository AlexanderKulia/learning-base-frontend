/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { FunctionComponent, useState } from "react";
import { DeleteOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import { Tag, TagsApi } from "../../services/api";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useDialog } from "../../contexts/DialogContext";

interface TagDeleteProps {
  tag: Tag;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const TagDelete: FunctionComponent<TagDeleteProps> = ({ tag, setTags }) => {
  const { handleSnackbar } = useSnackbar();
  const { handleDialog, handleDialogClose } = useDialog();

  const handleDelete = async () => {
    try {
      await TagsApi.remove(tag.id);
      setTags((prevState) => prevState.filter((el) => el.id !== tag.id));
      handleSnackbar("Tag deleted successfully");
    } catch (e) {
      handleSnackbar("Failed to delete tag");
    }
  };

  return (
    <DeleteOutlined
      onClick={() => {
        handleDialog({
          title: "Delete Tag",
          content: <>{`You are going to delete tag ${tag.title}. This action is irreversible`}</>,
          acceptButton: {
            label: "Delete",
            onClick: () => {
              handleDialogClose(handleDelete);
            }
          }
        });
      }}
    />
  );
};
