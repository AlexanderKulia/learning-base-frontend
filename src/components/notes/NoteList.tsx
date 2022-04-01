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
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import {
  Note,
  NotesApi,
  Paginated,
  Tag,
  TagsApi,
} from "../../services/api/index";
import { RichText } from "../utils/RichText/RichText";
import { Spinner } from "../utils/Spinner";
import { NoteDelete } from "./NoteDelete";

export const PER_PAGE = 10;

export const NoteList = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const theme = useTheme();
  const history = useHistory();
  const notesQuery = useQuery<
    AxiosResponse<Paginated<Note>>,
    Error,
    Paginated<Note>
  >(
    ["notes", debouncedSearchTerm, page, tagsFilter],
    () =>
      NotesApi.index({
        params: {
          search: debouncedSearchTerm,
          tags: tagsFilter,
          page,
          perPage: PER_PAGE,
        },
      }),
    {
      select: (res) => res.data,
    },
  );
  const tagsQuery = useQuery<AxiosResponse<Paginated<Tag>>, Error, Tag[]>(
    "tagsFilter",
    () =>
      TagsApi.index({
        params: {
          page,
          perPage: PER_PAGE,
        },
      }),
    { select: (res) => res.data.data },
  );

  const renderFilters = (): JSX.Element => {
    if (!tagsQuery.isSuccess) return <span>Failed to load tags</span>;
    const tags = tagsQuery.data;

    return (
      <>
        <Autocomplete
          id="tags-filter"
          multiple
          disableCloseOnSelect
          size="small"
          options={tags.map((tag) => tag.title)}
          renderInput={(params): JSX.Element => (
            <TextField
              margin="normal"
              {...params}
              label="Tags"
              placeholder="Select tags"
            />
          )}
          renderOption={(props, option, { selected }): JSX.Element => (
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
          onChange={(_e, newTagsFilter): void => {
            setTagsFilter(newTagsFilter);
          }}
        />
      </>
    );
  };

  const renderCreateButton = (): JSX.Element => {
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

  const renderTags = (tags: Tag[]): JSX.Element[] => {
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

  const renderNotes = (): JSX.Element | JSX.Element[] => {
    if (!notesQuery.isSuccess) return <span>Failed to load notes</span>;
    const notes = notesQuery.data.data;
    if (Array.isArray(notes) && !notes.length)
      return <span>No notes found</span>;

    return notes.map(({ id, title, content, tags }, index: number) => {
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
                    <NoteDelete note={{ id, title, content, tags }} />
                  </IconButton>
                }
              />
              <CardActionArea
                onClick={(): void => {
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
                    <RichText content={content} editable={false} />
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
    });
  };

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
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item md={4}>
            {renderFilters()}
          </Grid>
          <Grid item md={4}>
            <TextField
              id="notes-search"
              value={searchTerm}
              onChange={(e): void => {
                setSearchTerm(e.target.value);
              }}
              label="Search notes by content"
              variant="standard"
            />
          </Grid>
          <Grid item md={4}>
            <Pagination
              count={notesQuery.data?.meta.pageCount || 1}
              page={page}
              onChange={(_event, value): void => {
                setPage(value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {notesQuery.isLoading ? (
        <Spinner />
      ) : (
        <Grid container direction="row">
          {renderNotes()}
        </Grid>
      )}
    </>
  );
};
