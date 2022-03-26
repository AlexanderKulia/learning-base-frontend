import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Note } from "../../services/api";
import { NoteForm, NoteFormValues } from "../forms/NoteForm";

const defaultValues: NoteFormValues = {
  id: 0,
  title: "",
  content: JSON.stringify({
    type: "doc",
    content: [],
  }),
  tags: [],
};

export const NoteCreate = (): JSX.Element => {
  const [note] = useState<Omit<Note, "tags"> & { tags: string[] }>(
    defaultValues,
  );

  return (
    <Grid item md={6}>
      <Typography variant="h6">Create Note</Typography>
      <NoteForm formValues={note} formType="create" />
    </Grid>
  );
};
