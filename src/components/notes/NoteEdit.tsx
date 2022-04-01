import { css } from "@emotion/react";
import { Grid, Typography, useTheme } from "@mui/material";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Note, NotesApi } from "../../services/api";
import { NoteForm } from "../forms/NoteForm";
import { Spinner } from "../utils/Spinner";

export const NoteEdit = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const noteQuery = useQuery<AxiosResponse<Note>, Error, Note>(
    ["note", id],
    () => NotesApi.single(parseInt(id)),
    { select: (res) => res.data },
  );
  const theme = useTheme();

  if (noteQuery.isLoading) return <Spinner />;
  if (!noteQuery.isSuccess) return <span>Failed to load note</span>;

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
          id: noteQuery.data.id,
          title: noteQuery.data.title,
          content: noteQuery.data.content,
          tags: noteQuery.data.tags.map((tag) => {
            return tag.title;
          }),
        }}
        formType="edit"
      />
    </Grid>
  );
};
