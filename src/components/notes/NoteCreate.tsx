/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { KeyboardEvent, useRef } from "react";
import { TextField, Button, Grid, Chip, Typography, Autocomplete, useTheme, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { css } from "@emotion/react";
import { useFormik } from "formik";
import { NotesApi } from "../../services/api/index";

interface FormValues {
  title: string;
  content: string;
  _tag: string;
  tags: string[];
}

export const NoteCreate = () => {
  const initialValues: FormValues = {
    title: "",
    content: "",
    _tag: "",
    tags: []
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async ({ title, content, tags }) => {
      try {
        alert(JSON.stringify({ title, content, tags }));
        await NotesApi.create({ title, content, tags });
      } catch (error) {
        alert("Failed to create a note");
      }
    }
  });
  const theme = useTheme();
  const tagFieldRef = useRef<HTMLInputElement>(null);

  return (
    <Grid item md={4}>
      <Typography variant="h6">Create Note</Typography>
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
          variant="outlined"
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
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows={10}
          maxRows={10}
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
                variant="outlined"
                label={option}
                css={css`
                  border-radius: 0px;
                `}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField margin="normal" {...params} variant="outlined" label="Tags" placeholder="Add tag" />
          )}
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link color="inherit" underline="none" component={RouterLink} to="/">
              <Button
                variant="contained"
                color="primary"
                css={css`
                  margin-right: ${theme.spacing(1)};
                `}
              >
                Back
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button disabled={formik.isSubmitting} type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
