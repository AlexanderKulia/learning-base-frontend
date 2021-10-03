/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { Paper, Typography, Button, Link, useTheme } from "@mui/material";
import { useState } from "react";
import { css } from "@emotion/react";
import { Link as RouterLink } from "react-router-dom";
import { NotesApi } from "../../services/api/index";
import { useDialog } from "../../contexts/ModalContext";

export const NoteList = () => {
  const theme = useTheme();
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
          <Button
            variant="contained"
            color="primary"
            css={css`
              margin-bottom: ${theme.spacing(1)};
            `}
          >
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
      <Paper
        key={note.id}
        elevation={0}
        variant="outlined"
        css={css`
          width: 30%;
          padding: ${theme.spacing(1)};
          margin-bottom: ${theme.spacing(1)};
        `}
      >
        <Typography variant="h6">{note.title}</Typography>
        <Typography variant="body1">{note.content}</Typography>
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
