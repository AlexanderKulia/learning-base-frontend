import React, { KeyboardEvent, useRef } from "react";
import { TextField, Button, Grid, Chip } from "@mui/material";
import { Autocomplete } from "@mui/material";
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
  const tagFieldRef = useRef<HTMLInputElement>(null);

  return (
    <Grid container>
      <Grid item xs={3}>
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
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField margin="normal" {...params} variant="outlined" label="Tags" placeholder="Add tag" />
            )}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button disabled={formik.isSubmitting} type="submit" fullWidth variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
