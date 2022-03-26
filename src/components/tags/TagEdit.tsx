import { css } from "@emotion/react";
import { EditOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Tag, TagsApi } from "../../services/api";

interface TagEditProps {
  tag: Tag;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const TagEdit: FunctionComponent<TagEditProps> = ({ tag, setTags }) => {
  const [newTagTitle, setNewTagTitle] = useState(tag.title);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const { handleSnackbar } = useSnackbar();

  const handeTagChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTagTitle(event.target.value);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleUpdate = (tag: Tag): void => {
    setTags((prevState) =>
      prevState.map((el) =>
        el.id === tag.id ? Object.assign({}, el, { title: newTagTitle }) : el,
      ),
    );
  };

  const handleSave = async (): Promise<void> => {
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
        onClick={(): void => {
          setIsOpen(true);
        }}
      />
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            value={newTagTitle}
            onChange={handeTagChange}
          ></TextField>
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
