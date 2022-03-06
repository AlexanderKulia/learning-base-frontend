import React, { FunctionComponent, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import { Tag, TagsApi } from "../../services/api";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface TagEditProps {
  tag: Tag;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const TagEdit: FunctionComponent<TagEditProps> = ({ tag, setTags }) => {
  const [newTagTitle, setNewTagTitle] = useState(tag.title);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const { handleSnackbar } = useSnackbar();

  const handeTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagTitle(event.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUpdate = (tag: Tag) => {
    setTags((prevState) =>
      prevState.map((el) => (el.id === tag.id ? Object.assign({}, el, { title: newTagTitle }) : el))
    );
  };

  const handleSave = async () => {
    try {
      await TagsApi.update(tag.id, { title: newTagTitle });
      handleClose();
      handleUpdate(tag);
      handleSnackbar("Tag successfully renamed");
    } catch (e) {
      handleSnackbar("Failed to rename tag");
    }
  };

  return (
    <>
      <EditOutlined
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <TextField size="small" value={newTagTitle} onChange={handeTagChange}></TextField>
        </DialogContent>
        <DialogActions
          css={css`
            padding: ${theme.spacing(3)};
          `}
        >
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="small" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
