import { css } from "@emotion/react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Grid,
  Grow,
  IconButton,
  Link,
  Pagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Note, NotesApi, Tag, TagsApi } from "../../services/api/index";
import { Spinner } from "../utils/Spinner";
import { NoteDelete } from "./NoteDelete";

export const PER_PAGE = 10;

export const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesRes = await NotesApi.index({
          params: {
            search: debouncedSearchTerm,
            tags: tagsFilter,
            page,
            perPage: PER_PAGE,
          },
        });
        setNotes(notesRes.data.data);
        setPageCount(notesRes.data.meta.pageCount);

        setIsLoading(false);
      } catch (e) {
        alert("Could not fetch notes");
      }
    };

    fetchNotes();
  }, [debouncedSearchTerm, tagsFilter, page]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsRes = await TagsApi.index({
          params: { page: 1, perPage: 10 },
        });
        setTags(tagsRes.data.data);
      } catch (e) {
        alert("Could not fetch tags");
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const renderFilters = () => {
    return (
      <>
        <Autocomplete
          id="tags-filter"
          multiple
          disableCloseOnSelect
          size="small"
          options={tags.map((tag) => tag.title)}
          renderInput={(params) => (
            <TextField
              margin="normal"
              {...params}
              label="Tags"
              placeholder="Select tags"
            />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                checked={selected}
                css={css`
                  margin-right: 8px;
                `}
              />
              {option}
            </li>
          )}
          value={tagsFilter}
          onChange={(e, newTagsFilter) => {
            setTagsFilter(newTagsFilter);
          }}
        />
      </>
    );
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
        {renderFilters()}
        <TextField
          id="notes-search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          label="Search notes by content"
          variant="standard"
        />
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_event, value) => {
            setPage(value);
          }}
        />
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
