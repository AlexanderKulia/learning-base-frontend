import { css } from "@emotion/react";
import { Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Note, NotesApi } from "../../services/api";
import { NoteForm } from "../forms/NoteForm";
import { Spinner } from "../utils/Spinner";

export const NoteEdit = (): JSX.Element => {
  const [note, setNote] = useState<Note>({
    id: 0,
    title: "",
    content: "",
    tags: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  useEffect(() => {
    const fetchNote = async (id: number): Promise<void> => {
      const res = await NotesApi.single(id);
      setNote(res.data);
      setLoading(false);
    };
    fetchNote(parseInt(id));
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <Grid
      item
      md={6}
      css={css`
        padding-right: ${theme.spacing(2)};
      `}
    >
      <Typography variant="h6">Edit Note</Typography>
      <NoteForm
        formValues={{
          id: note.id,
          title: note.title,
          content: note.content,
          tags: note.tags.map((tag) => {
            return tag.title;
          }),
        }}
        formType="edit"
      />
    </Grid>
  );
};
