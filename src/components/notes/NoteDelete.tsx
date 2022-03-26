import { DeleteOutline } from "@mui/icons-material";
import { useDialog } from "../../contexts/DialogContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { NotesApi } from "../../services/api";

interface DeleteNoteProps {
  id: number;
  title: string;
  handleDelete: (id: number) => void;
}

export const NoteDelete = ({
  id,
  title,
  handleDelete,
}: DeleteNoteProps): JSX.Element => {
  const { handleDialog, handleDialogClose } = useDialog();
  const { handleSnackbar } = useSnackbar();

  return (
    <DeleteOutline
      onClick={(): void => {
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
              handleDialogClose(async () => {
                try {
                  await NotesApi.remove(id);
                  handleDelete(id);
                  handleSnackbar(`Deleted note ${title}`);
                } catch (e) {
                  alert("Could not delete note");
                }
              });
            },
          },
        });
      }}
    />
  );
};
