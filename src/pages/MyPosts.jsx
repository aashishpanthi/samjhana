import { useState, useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import firebase from "../firebase";
import "firebase/compat/database";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const columns = [
  { id: "title", label: "Post Title", minWidth: 100 },
  { id: "description", label: "Post Description", minWidth: 170 },
  {
    id: "createdDate",
    label: "Post published date",
    minWidth: 120,
    align: "center",
  },
  {
    id: "updatedDate",
    label: "Post updated date",
    minWidth: 120,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

function createData(id, title, description, createdDate, updatedDate) {
  return { id, title, description, createdDate, updatedDate };
}

const MyPosts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [loading, setLoading] = useState(false);
  const userInfo = useContext(UserContext);
  const { user } = userInfo;
  const [postsList, setPostsList] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deletePost = (id) => {
    setLoading(true);
    firebase
      .database()
      .ref("Posts/" + id)
      .remove();
    setLoading(false);
  };

  useEffect(() => {
    firebase
      .database()
      .ref("Posts")
      .on("value", (snapshot) => {
        const posts = snapshot.val();
        const postList = [];

        for (let post in posts) {
          if (posts[post].creator === user._delegate.uid) {
            postList.push({
              id: post,
              ...posts[post],
            });
          }
        }
        setPostsList(postList);
      });
  }, []);

  const rows = postsList
    ? postsList.map(({ id, title, description, createdAt, updatedAt }) =>
        createData(
          id,
          title,
          description,
          new Date(createdAt).toString().substring(4, 15),
          new Date(updatedAt).toString().substring(4, 15)
        )
      )
    : null;

  if (!user) {
    return <div>You need to login to create a post</div>;
  }

  return (
    <Container maxWidth="lg">
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        style={{ margin: "1rem 0" }}
      >
        <Toolbar>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Your Posts
          </Typography>
        </Toolbar>

        {postsList ? (
          postsList.length === 0 ? (
            <Typography
              variant="h6"
              component="div"
              style={{ padding: "0 1rem" }}
            >
              You have not published any post yet
            </Typography>
          ) : (
            <TableContainer sx={{ maxHeight: 550 }}>
              <Table stickyHeader aria-label="Your published posts">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            if (column.id !== "action") {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align="right">
                                  <Button
                                    color="secondary"
                                    component={Link}
                                    to={`/edit-post/${row.id}`}
                                    startIcon={<EditIcon />}
                                    variant="contained"
                                    size="small"
                                  >
                                    Edit
                                  </Button>

                                  <LoadingButton
                                    color="error"
                                    onClick={() => deletePost(row.id)}
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<DeleteIcon />}
                                    variant="contained"
                                    size="small"
                                    style={{ margin: "0 5px" }}
                                  >
                                    Delete
                                  </LoadingButton>
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )
        ) : (
          <Box component="section" sx={{ p: 2, mt: 2, textAlign: "center" }}>
            <CircularProgress size="large" />
          </Box>
        )}
        <TablePagination
          rowsPerPageOptions={[7, 15, 25]}
          component="div"
          count={rows ? (rows.length): 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default MyPosts;
