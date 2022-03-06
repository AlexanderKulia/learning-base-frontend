import { css } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Grow,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Note, NotesApi, Tag } from "../../services/api/index";
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

  const renderTags = (tags: Tag[]) => {
    return tags.map(({ id, title }) => (
      <Chip
        key={id}
        label={title}
        size="small"
        css={css`
          margin-right: 3px;
        `}
      />
    ));
  };

  const renderNotes = notes.map(
    ({ id, title, content, tags }, index: number) => {
      const editor = new Editor({
        editable: false,
        content: JSON.parse(content),
        extensions: [StarterKit],
      });

      return (
        <Grid item md={3} key={id}>
          <Grow in={true} timeout={300 + 300 * index}>
            <Card
              key={id}
              css={css`
                margin: ${theme.spacing(0, 1, 1, 0)};
                min-height: 220px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `}
            >
              <CardHeader
                title={title}
                action={
                  <IconButton>
                    <NoteDelete
                      id={id}
                      title={title}
                      handleDelete={handleDelete}
                    />
                  </IconButton>
                }
              />
              <CardActionArea
                onClick={() => {
                  history.push(`notes/${id}`);
                }}
              >
                <CardContent
                  css={css`
                    height: 92px;
                  `}
                >
                  <Box
                    css={css`
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 3;
                      -webkit-box-orient: vertical;
                    `}
                  >
                    <EditorContent editor={editor} />
                  </Box>
                </CardContent>
              </CardActionArea>
              <Box
                css={css`
                  margin-top: auto;
                  padding: ${theme.spacing(2, 2)};
                `}
              >
                {renderTags(tags)}
              </Box>
            </Card>
          </Grow>
        </Grid>
      );
    }
  );

  return (
    <>
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
      </Grid>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid container direction="row">
          {renderNotes}
        </Grid>
      )}
    </>
  );
};
