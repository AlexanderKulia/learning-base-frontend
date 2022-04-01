import { DeleteOutlined } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { useDialog } from "../../contexts/DialogContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Tag, TagsApi } from "../../services/api";

interface TagDeleteProps {
  tag: Tag;
}

export const TagDelete = ({ tag }: TagDeleteProps): JSX.Element => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => TagsApi.remove(tag.id), {
    onMutate: async () => {
      await queryClient.cancelQueries("tags");
      const prevTags = queryClient.getQueryData<Tag[]>("tags");
      if (prevTags) {
        queryClient.setQueryData<Tag[]>(
          "tags",
          prevTags.filter((prevTag) => prevTag.id !== tag.id),
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
  });
  const { handleSnackbar } = useSnackbar();
  const { handleDialog, handleDialogClose } = useDialog();

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
              handleDialogClose(() => {
                mutation.mutate(undefined, {
                  onSuccess: () => {
                    handleSnackbar(`Tag ${tag.title} deleted successfully`);
                  },
                  onError: () => {
                    handleSnackbar("Could not delete tag", "error");
                  },
                });
              });
            },
          },
        });
      }}
    />
  );
};
