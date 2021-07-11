import React, { useEffect } from "react";
import { makeStyles, Paper, Typography, Button, Link } from "@material-ui/core";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { NotesApi } from "../../services/api/index";
import { useDialog } from "../../contexts/ModalContext";

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
  const { handleModal } = useDialog();

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await NotesApi.index();
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
      <>
        <Link color="inherit" underline="none" component={RouterLink} to="/notes/new">
          <Button variant="contained" color="primary" className={classes.createButton}>
            New
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleModal({ title: "title", content: "content", cancelButton: "cancel", acceptButton: "accept" });
          }}
        >
          Dialog
        </Button>
      </>
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
