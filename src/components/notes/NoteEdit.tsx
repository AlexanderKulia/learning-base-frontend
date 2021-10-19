import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { NoteForm } from "../forms/NoteForm";
import { useParams } from "react-router-dom";
import { Note, Tag } from "../../services/api";
import { NotesApi } from "../../services/api";
import { Spinner } from "../utils/Spinner";

export const NoteEdit = () => {
  const [note, setNote] = useState<Note>({ id: 0, title: "", content: "", tags: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchNote = async (id: number) => {
      const res = await NotesApi.single(id);
      setNote(res.data);
      setLoading(false);
    };
    fetchNote(parseInt(id));
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <Grid item md={4}>
      <Typography variant="h6">Edit Note</Typography>
      <NoteForm
        formValues={{
          id: note.id,
          title: note.title,
          content: note.content,
          tags: note.tags.map((tag) => {
            return tag.title;
          })
        }}
        formType="edit"
      />
    </Grid>
  );
};
