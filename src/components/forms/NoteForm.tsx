/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { FunctionComponent } from "react";
import { TextField, Button, Grid, Chip, Autocomplete, useTheme, Link } from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import { useFormik } from "formik";
import { NotesApi } from "../../services/api/index";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface NoteFormValues {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

interface NoteFormProps {
  formValues: NoteFormValues;
  formType: "create" | "edit";
}

export const NoteForm: FunctionComponent<NoteFormProps> = ({ formValues, formType }) => {
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
    }
  });
  const theme = useTheme();

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
      <TextField
        value={formik.values.content}
        onChange={formik.handleChange}
        margin="normal"
        required
        fullWidth
        multiline
        rows={10}
        label="Content"
        type="text"
        id="content"
        name="content"
      />
      <Autocomplete
        multiple
        size="small"
        id="_tag"
        options={[{ title: "tag1" }, { title: "tag2" }].map((option) => option.title)}
        freeSolo
        open={false}
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
            <Chip
              label={option}
              css={css`
                border-radius: 0px;
              `}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => <TextField margin="normal" {...params} label="Tags" placeholder="Add tag" />}
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
