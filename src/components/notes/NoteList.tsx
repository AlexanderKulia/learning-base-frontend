import React, { useEffect } from "react";
import { makeStyles, Paper, Typography, Button, Link } from "@material-ui/core";
import { useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  noteCard: { width: "30%", padding: theme.spacing(1), marginBottom: theme.spacing(1) },
  noteTitle: {},
  noteContent: {},
  createButton: { marginBottom: theme.spacing(1) }
}));

export const NoteList = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState<{ id: number; title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await apiClient.get("/notes");
      setNotes(res.data);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderCreateButton = () => {
    return (
      <Link color="inherit" underline="none" component={RouterLink} to="/notes/new">
        <Button variant="contained" color="primary" className={classes.createButton}>
          New
        </Button>
      </Link>
    );
  };

  const renderNotes = notes.map((note) => {
    return (
      <Paper key={note.id} elevation={0} variant="outlined" className={classes.noteCard}>
        <Typography variant="h6" className={classes.noteTitle}>
          {note.title}
        </Typography>
        <Typography variant="body1" className={classes.noteContent}>
          {note.content}
        </Typography>
      </Paper>
    );
  });

  return (
    <>
      {renderCreateButton()}
      {renderNotes}
    </>
  );
};
