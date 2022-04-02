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
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Tag, TagsApi, UpdateTagDto } from "../../services/api";

interface TagEditProps {
  tag: Tag;
}

export const TagEdit = ({ tag }: TagEditProps): JSX.Element => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (dto: UpdateTagDto) => TagsApi.update(dto.id, { title: dto.title }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("tags");
        const prevTags = queryClient.getQueryData<Tag[]>("tags");
        if (prevTags) {
          queryClient.setQueryData<Tag[]>(
            "tags",
            prevTags.map((prevTag) =>
              prevTag.id === tag.id
                ? Object.assign({}, prevTag, { title: newTagTitle })
                : prevTag,
            ),
          );
        }

        return { prevTags };
      },
      onError: (_err, _vars, context) => {
        if (context?.prevTags) {
          queryClient.setQueryData("tags", context.prevTags);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("tags");
      },
    },
  );
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
            id="title"
          ></TextField>
        </DialogContent>
        <DialogActions
          css={css`
            padding: ${theme.spacing(3)};
          `}
        >
          <Button size="small" onClick={handleClose} id="cancel">
            Cancel
          </Button>
          <Button
            size="small"
            id="submit"
            onClick={(): void => {
              mutation.mutate(
                { id: tag.id, title: newTagTitle },
                {
                  onSuccess: () => {
                    handleSnackbar("Tag successfully renamed");
                  },
                  onError: () => {
                    handleSnackbar("Could not rename tag", "error");
                  },
                  onSettled: () => {
                    handleClose();
                  },
                },
              );
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
