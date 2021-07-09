import React, { KeyboardEvent, useEffect, useRef } from "react";
import { makeStyles, TextField, Button, Grid, Chip } from "@material-ui/core";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  tag: {
    display: "block",
    padding: "5px",
    backgroundColor: "green",
    borderRadius: "10px",
    margin: "0px 2px",
    whiteSpace: "nowrap"
  },
  tagContainer: {
    flexWrap: "wrap"
  }
}));

interface FormValues {
  title: string;
  content: string;
  _tag: string;
  tags: string[];
}

export const NoteCreate = () => {
  const classes = useStyles();
  const initialValues: FormValues = {
    title: "",
    content: "",
    _tag: "",
    tags: []
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        alert(JSON.stringify(values));
      } catch (error) {
        alert("Failed to sign in");
      }
    }
  });
  const tagFieldRef = useRef<HTMLInputElement>(null);

  const renderTags = formik.values.tags.map((tag) => {
    return (
      <Chip
        key={tag}
        size="small"
        label={tag}
        onDelete={() => {
          console.log("DELETED");
        }}
        className={classes.tag}
      />
    );
  });

  const shouldShrinkTagField = () => {
    return !!tagFieldRef?.current?.value || tagFieldRef?.current?.previousElementSibling?.tagName === "SPAN";
  };

  const renderTag = () => {
    const tag = document.createElement("span");
    tag.innerHTML = formik.values._tag;
    tag.style.cssText =
      "display:block;padding:5px;background-color:#ebebeb;border-radius:10px;margin:15px 2px;white-space:nowrap";
    tag.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLSpanElement;
      target.remove();
    });
    return tag;
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Tab" && formik.values._tag !== "") {
      tagFieldRef?.current?.parentNode?.insertBefore(renderTag(), tagFieldRef?.current);
      formik.setFieldValue("tags", [...formik.values.tags, formik.values._tag]);
      formik.setFieldValue("_tag", "");
    }
  };

  // useEffect(() => {
  //   const tagFieldFormControl = document.getElementById("_tag")?.parentElement;
  //   if (tagFieldFormControl) {
  //     tagFieldFormControl.style.flexWrap = "wrap";
  //   }
  // }, []);

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
          <TextField
            value={formik.values._tag}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Tags"
            type="text"
            id="_tag"
            name="_tag"
            inputRef={tagFieldRef}
            InputLabelProps={{ shrink: shouldShrinkTagField() }}
            onKeyDown={handleAddTag}
            className={classes.tagContainer}
          ></TextField>

          <Grid container justify="flex-end">
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
