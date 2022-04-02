import { DeleteOutline } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { useDialog } from "../../contexts/DialogContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Note, NotesApi } from "../../services/api";

interface DeleteNoteProps {
  note: Note;
}

export const NoteDelete = ({ note }: DeleteNoteProps): JSX.Element => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => NotesApi.remove(note.id), {
    onMutate: async () => {
      await queryClient.cancelQueries("notes");
      const prevNotes = queryClient.getQueryData<Note[]>("notes");
      if (prevNotes) {
        queryClient.setQueryData<Note[]>(
          "notes",
          prevNotes.filter((prevNote) => prevNote.id !== note.id),
        );
      }

      return { prevNotes };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevNotes) {
        queryClient.setQueryData("notes", context.prevNotes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("notes");
    },
  });
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
              <b>{note.title}</b>
            </>
          ),
          acceptButton: {
            label: "Delete",
            onClick: () => {
              handleDialogClose(() => {
                mutation.mutate(undefined, {
                  onSuccess: () => {
                    handleSnackbar(`Deleted note ${note.title}`);
                  },
                  onError: () => {
                    handleSnackbar("Could not delete note", "error");
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
