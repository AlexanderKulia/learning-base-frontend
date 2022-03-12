import { css } from "@emotion/react";
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { NotesApi, Tag, TagsApi } from "../../services/api/index";
import { RichText } from "./RichText/RichText";

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

export const NoteForm: FunctionComponent<NoteFormProps> = ({
  formValues,
  formType,
}) => {
  const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
  const [debouncedSuggestedTags, setDebouncedSuggestedTags] = useState<Tag[]>(
    []
  );

  const history = useHistory();
  const { handleSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: { ...formValues, _tag: "" },
    onSubmit: async ({ id, title, content, tags }) => {
      try {
        switch (formType) {
          case "create":
            await NotesApi.create({ title, content, tags });
            handleSnackbar("Note created successfully");
            break;
          case "edit":
            await NotesApi.update(id, { title, content, tags });
            handleSnackbar(`Note ${title} updated successfully`);
            break;
        }
        history.push("/");
      } catch (error) {
        handleSnackbar("Failed to submit the note");
      }
    },
  });
  const theme = useTheme();
  useEffect(() => {
    const fetchSuggestedTags = async () => {
      try {
        const res = await TagsApi.index({
          params: {
            search: formik.values._tag,
          },
        });
        setSuggestedTags(res.data.data);
      } catch (e) {
        alert("Could not fetch suggested tags");
      }
    };

    const timerId = setTimeout(() => {
      fetchSuggestedTags();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [formik.values._tag]);

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      onKeyDown={(e) => {
        if (e.code === "Tab") {
          e.preventDefault();
        }
      }}
    >
      <TextField
        value={formik.values.title}
        onChange={formik.handleChange}
        margin="normal"
        required
        fullWidth
        label="Title"
        type="text"
        id="title"
        name="title"
      />
      <RichText
        content={formik.values.content}
        onChange={(content) => {
          formik.setFieldValue("content", content);
        }}
      />
      <Autocomplete
        multiple
        size="small"
        id="_tag"
        //TODO rework autocomplete
        options={suggestedTags.map((option) => option.title)}
        freeSolo
        value={formik.values.tags}
        onChange={(e, value) => {
          formik.setFieldValue("tags", value);
        }}
        inputValue={formik.values._tag}
        onInputChange={(e, value) => {
          formik.setFieldValue("_tag", value);
        }}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
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
