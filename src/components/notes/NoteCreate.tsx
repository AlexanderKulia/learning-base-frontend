import React from "react";
import { Grid, Typography } from "@mui/material";
import { NoteForm } from "../forms/NoteForm";

export const NoteCreate = () => {
  return (
    <Grid item md={4}>
      <Typography variant="h6">Create Note</Typography>
      <NoteForm formValues={{ id: 0, title: "", content: "", tags: [] }} formType="create" />
    </Grid>
  );
};
