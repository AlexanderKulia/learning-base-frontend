import { css } from "@emotion/react";
import { SearchOutlined } from "@mui/icons-material";
import {
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Tag, TagsApi } from "../../services/api";
import { Spinner } from "../utils/Spinner";
import { TagDelete } from "./TagDelete";
import { TagEdit } from "./TagEdit";

type SortBy = "id" | "title" | "noteCount";

type SortOrder = "asc" | "desc";

export const ROWS_PER_PAGE = 10;

export const TagList = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [sortBy, setSortBy] = useState<SortBy>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState<number>(1);
  const [itemCount, setItemCount] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE);
  const theme = useTheme();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await TagsApi.index({
          params: {
            search: debouncedSearchTerm,
            sortBy,
            sortOrder,
            page,
            perPage: rowsPerPage,
          },
        });
        setTags(res.data.data);
        setItemCount(res.data.meta.itemCount);

        setIsLoading(false);
      } catch (e) {
        alert("Could not fetch tags");
      }
    };
    fetchTags();
  }, [page, rowsPerPage, debouncedSearchTerm, sortBy, sortOrder]);

  const handeSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    return tags.map((tag) => {
      return (
        <TableRow key={tag.id}>
          <TableCell>{tag.id}</TableCell>
          <TableCell>{tag.title}</TableCell>
          <TableCell>{tag._count.notes}</TableCell>
          <TableCell>
            <TagEdit tag={tag} setTags={setTags} />
            <TagDelete tag={tag} setTags={setTags} />
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleSort = (column: SortBy) => {
    let tSortOrder = sortOrder;

    if (column === sortBy) {
      tSortOrder = tSortOrder === "asc" ? "desc" : "asc";
      setSortOrder(tSortOrder);
    } else {
      setSortBy(column);
      tSortOrder = "asc";
      setSortOrder(tSortOrder);
    }
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "id"}
                  direction={sortOrder}
                  onClick={() => {
                    handleSort("id");
                  }}
                >
                  Id
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "title"}
                  direction={sortOrder}
                  onClick={() => {
                    handleSort("title");
                  }}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "noteCount"}
                  direction={sortOrder}
                  onClick={() => {
                    handleSort("noteCount");
                  }}
                >
                  Note count
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={itemCount}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={(_event, value) => {
                  setPage(value + 1);
                }}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value));
                }}
              />
            </TableRow>
          </TableFooter>
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
              ),
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
