/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Typography, Button, Link, useTheme, Box, Grid, Card, CardActionArea } from "@mui/material";
import { css } from "@emotion/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Note, NotesApi } from "../../services/api/index";
import { Spinner } from "../utils/Spinner";
import { NoteDelete } from "./NoteDelete";

export const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await NotesApi.index();
        setNotes(res.data);
        setIsLoading(false);
      } catch (e) {
        alert("Could not fetch notes");
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const renderCreateButton = () => {
    return (
      <>
        <Link underline="none" component={RouterLink} to="/notes/new">
          <Button
            variant="contained"
            css={css`
              margin-bottom: ${theme.spacing(1)};
            `}
          >
            New
          </Button>
        </Link>
      </>
    );
  };

  const renderNotes = notes.map(({ id, title, content }) => {
    return (
      <Card
        key={id}
        css={css`
          display: flex;
          flex-direction: column;
          margin-bottom: ${theme.spacing(1)};
        `}
      >
        <CardActionArea
          css={css`
            padding: ${theme.spacing(1)};
          `}
          onClick={() => {
            history.push(`notes/${id}`);
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
        </CardActionArea>
        <NoteDelete id={id} title={title} handleDelete={handleDelete} />
      </Card>
    );
  });

  return (
    <Grid item md={4}>
      <Typography
        variant="h5"
        css={css`
          margin-bottom: ${theme.spacing(1)};
        `}
      >
        My Notes
      </Typography>
      {renderCreateButton()}
      <Box
        css={css`
          position: relative;
        `}
      >
        {isLoading ? <Spinner /> : renderNotes}
      </Box>
    </Grid>
  );
};
