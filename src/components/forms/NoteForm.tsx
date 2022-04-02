import { css } from "@emotion/react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  useTheme,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useDebounce } from "../../hooks/useDebounce";
import {
  CreateNoteDto,
  NotesApi,
  Paginated,
  Tag,
  TagsApi,
  UpdateNoteDto,
} from "../../services/api/index";
import { emptyContent, RichText } from "../utils/RichText/RichText";

export interface NoteFormValues {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

interface NoteFormProps {
  formValues: NoteFormValues;
  formType: "create" | "edit";
}

const formMessages = {
  create: {
    success: "Note successfully created",
    error: "Could not create note",
  },
  edit: {
    success: "Note successfully updated",
    error: "Could not update note",
  },
};

const validate = (values: NoteFormValues): Partial<NoteFormValues> => {
  const errors: Partial<NoteFormValues> = {};

  if (!values.title) {
    errors.title = "Required";
  }

  if (emptyContent.includes(values.content)) {
    errors.content = "Required";
  }

  return errors;
};

export const NoteForm = ({
  formValues,
  formType,
}: NoteFormProps): JSX.Element => {
  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (dto: CreateNoteDto) => NotesApi.create(dto),
    {
      onSettled: () => {
        queryClient.invalidateQueries("note");
        queryClient.invalidateQueries("notes");
      },
    },
  );
  const updateMutation = useMutation(
    ({ id, title, content, tags }: UpdateNoteDto) =>
      NotesApi.update(id, { title, content, tags }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("note");
        queryClient.invalidateQueries("notes");
      },
    },
  );
  const formik = useFormik({
    initialValues: { ...formValues, tag: "" },
    validate,
    onSubmit: async ({ id, title, content, tags }) => {
      if (formType === "create")
        createMutation.mutate(
          { title, content, tags },
          {
            onSuccess: () => {
              handleSnackbar(formMessages[formType]["success"]);
              history.push("/");
            },
            onError: () => {
              handleSnackbar(formMessages[formType]["error"], "error");
            },
          },
        );
      if (formType === "edit")
        updateMutation.mutate(
          { id, title, content, tags },
          {
            onSuccess: () => {
              handleSnackbar(formMessages[formType]["success"]);
            },
            onError: () => {
              handleSnackbar(formMessages[formType]["error"], "error");
            },
            onSettled: () => {
              history.push("/");
            },
          },
        );
    },
  });
  const debouncedTag = useDebounce(formik.values.tag, 500);
  const suggestedTagsQuery = useQuery<
    AxiosResponse<Paginated<Tag>>,
    Error,
    Tag[]
  >(
    ["suggestedTags", debouncedTag],
    () =>
      TagsApi.index({
        params: {
          search: debouncedTag,
          page: 1,
          perPage: 10,
        },
      }),
    { select: (res) => res.data.data },
  );
  const theme = useTheme();
  const history = useHistory();
  const { handleSnackbar } = useSnackbar();

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      onKeyDown={(e): void => {
        if (e.code === "Tab") {
          e.preventDefault();
        }
      }}
    >
      <TextField
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && formik.errors.title ? true : false}
        helperText={
          formik.touched.title && formik.errors.title
            ? formik.errors.title
            : null
        }
        margin="normal"
        required
        fullWidth
        label="Title"
        type="text"
        id="title"
        name="title"
      />
      <Box
        css={css`
          border: 1px solid
            ${formik.touched.content && formik.errors.content
              ? "#d32f2f"
              : "#c4c4c4"};
        `}
      >
        <RichText
          content={formik.values.content}
          onUpdate={(content): void => {
            formik.setFieldValue("content", content);
          }}
          setFieldTouched={formik.setFieldTouched}
          renderMenu
        />
      </Box>
      {formik.touched.content && formik.errors.content ? (
        <p
          css={css`
            margin: 3px 14px 0px 14px;
            font-size: 0.75rem;
            color: #d32f2f;
          `}
          id="content-helper-text"
        >
          {formik.errors.content}
        </p>
      ) : null}
      <Autocomplete
        multiple
        size="small"
        id="tag"
        options={
          suggestedTagsQuery.data
            ? suggestedTagsQuery.data.map((option) => option.title)
            : []
        }
        freeSolo
        value={formik.values.tags}
        onChange={(e, value): void => {
          formik.setFieldValue("tags", value);
        }}
        inputValue={formik.values.tag}
        onInputChange={(e, value): void => {
          formik.setFieldValue("tag", value);
        }}
        renderTags={(value: string[]): JSX.Element[] =>
          value.map((option: string, index: number) => (
            <Chip label={option} key={index} />
          ))
        }
        renderInput={(params): JSX.Element => (
          <TextField
            margin="normal"
            {...params}
            label="Tags"
            placeholder="Add tag"
          />
        )}
      />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link color="inherit" underline="none" component={RouterLink} to="/">
            <Button
              css={css`
                margin-right: ${theme.spacing(1)};
              `}
            >
              Back
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Button disabled={formik.isSubmitting} type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
