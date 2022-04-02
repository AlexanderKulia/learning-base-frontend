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
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "../../hooks/useDebounce";
import { Paginated, Tag, TagsApi } from "../../services/api";
import { Spinner } from "../utils/Spinner";
import { TagDelete } from "./TagDelete";
import { TagEdit } from "./TagEdit";

type SortBy = "id" | "title" | "noteCount";

type SortOrder = "asc" | "desc";

export const ROWS_PER_PAGE = 10;

export const TagList = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [sortBy, setSortBy] = useState<SortBy>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE);
  const tagsQuery = useQuery<
    AxiosResponse<Paginated<Tag>>,
    Error,
    Paginated<Tag>
  >(
    ["tags", { page, rowsPerPage, debouncedSearchTerm, sortBy, sortOrder }],
    () =>
      TagsApi.index({
        params: {
          search: debouncedSearchTerm,
          sortBy,
          sortOrder,
          page,
          perPage: rowsPerPage,
        },
      }),
    {
      select: (res) => res.data,
    },
  );
  const theme = useTheme();

  if (tagsQuery.isLoading) return <Spinner />;
  if (!tagsQuery.isSuccess) return <span>Failed to load tags</span>;

  const handeSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchTerm(event.target.value);
  };

  const renderTableRows = (): JSX.Element | JSX.Element[] => {
    const tags = tagsQuery.data.data;
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
            <TagEdit tag={tag} />
            <TagDelete tag={tag} />
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleSort = (column: SortBy): void => {
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

  const renderTable = (): JSX.Element => {
    return (
      <TableContainer component={Paper}>
        <Table id="tags">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "id"}
                  direction={sortOrder}
                  onClick={(): void => {
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
                  onClick={(): void => {
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
                  onClick={(): void => {
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
                count={tagsQuery.data.meta.pageCount}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={(_event, value): void => {
                  setPage(value + 1);
                }}
                onRowsPerPageChange={(event): void => {
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
      {tagsQuery.isLoading ? <Spinner /> : renderTable()}
    </Grid>
  );
};
