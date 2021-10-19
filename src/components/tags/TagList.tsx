/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Typography,
  TextField,
  InputAdornment
} from "@mui/material";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@mui/icons-material";
import { css } from "@emotion/react";
import { TagsApi } from "../../services/api";
import { Spinner } from "../utils/Spinner";
import { useTheme } from "@mui/system";
import { TagEdit } from "./TagEdit";
import { TagDelete } from "./TagDelete";

export interface Tag {
  id: number;
  title: string;
}

export const TagList = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const theme = useTheme();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await TagsApi.index();
        setTags(res.data);
        setIsLoading(false);
      } catch (e) {
        alert("Could not fetch tags");
      }
    };
    fetchTags();
  }, []);

  const handeSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderTableRows = () => {
    if (tags.length === 0)
      return (
        <TableRow>
          <TableCell align="center" colSpan={4}>
            No tags found
          </TableCell>
        </TableRow>
      );

    return tags
      .filter((tag) => tag.title.includes(searchTerm))
      .map((tag) => {
        return (
          <TableRow>
            <TableCell>{tag.id}</TableCell>
            <TableCell>{tag.title}</TableCell>
            <TableCell>tbd</TableCell>
            <TableCell>
              <TagEdit tag={tag} setTags={setTags} />
              <TagDelete tag={tag} setTags={setTags} />
            </TableCell>
          </TableRow>
        );
      });
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Grid item md={4}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        css={css`
          margin-bottom: ${theme.spacing(1)};
        `}
      >
        <Grid item>
          <Typography
            variant="h5"
            css={css`
              margin-bottom: ${theme.spacing(1)};
            `}
          >
            My Tags
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
            size="small"
            value={searchTerm}
            onChange={handeSearchTermChange}
          ></TextField>
        </Grid>
      </Grid>
      {isLoading ? <Spinner /> : renderTable()}
    </Grid>
  );
};
