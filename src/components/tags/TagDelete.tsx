import { DeleteOutlined } from "@mui/icons-material";
import React, { FunctionComponent } from "react";
import { useDialog } from "../../contexts/DialogContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Tag, TagsApi } from "../../services/api";

interface TagDeleteProps {
  tag: Tag;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const TagDelete: FunctionComponent<TagDeleteProps> = ({
  tag,
  setTags,
}) => {
  const { handleSnackbar } = useSnackbar();
  const { handleDialog, handleDialogClose } = useDialog();

  const handleDelete = async (): Promise<void> => {
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
      onClick={(): void => {
        handleDialog({
          title: "Delete Tag",
          content: (
            <>{`You are going to delete tag ${tag.title}. This action is irreversible`}</>
          ),
          acceptButton: {
            label: "Delete",
            onClick: () => {
              handleDialogClose(handleDelete);
            },
          },
        });
      }}
    />
  );
};
