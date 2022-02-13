import { useState, useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import {
  Container,
  Typography,
  Divider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import firebase from "../firebase";
import "firebase/compat/database";
import { UserContext } from "../userContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPost = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, settitle] = useState("");
  const userInfo = useContext(UserContext);
  const { user } = userInfo;
  const [mode, setmode] = useState("edit");

  const savePost = (e) => {
    e.preventDefault();
    const postRef = firebase.database().ref("Posts");
    const post = {
      creator: user.uid,
      title,
      body: value,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    };

    postRef.push(post);

    toast.success('Post published successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  if(!user){
    return <div>You need to login to create a post</div>
  }

  return (
    <Container style={{ marginTop: "2rem" }} maxWidth="lg">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Divider>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          onChange={(e) => setmode(e.target.value)}
        >
          <ToggleButton value="edit">Edit</ToggleButton>
          <ToggleButton value="preview">Preview</ToggleButton>
        </ToggleButtonGroup>
      </Divider>
      {mode == "preview" ? (
        <>
          <Typography variant="h4" component="h2">
            Preview
          </Typography>
          <Box
            component="section"
            sx={{ p: 2, mt: 2, border: "1px solid gray" }}
          >
            <MDEditor.Markdown
              source={value}
              rehypePlugins={[[rehypeSanitize]]}
            />
          </Box>
        </>
      ) : (
        <form onSubmit={savePost}>
          <Typography variant="h4" gutterBottom>
            New Post
          </Typography>

          <TextField
            fullWidth
            id="post-title"
            label="Title"
            value={title}
            onChange={(event) => settitle(event.target.value)}
            margin={"normal"}
            required={true}
          />

          <Typography variant="h6">
            <label htmlFor="post-body">Body</label>
          </Typography>
          <MDEditor
            value={value}
            onChange={setValue}
            height={400}
            toolbarHeight={50}
            preview="edit"
            id="post-body"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />

          <Button
            variant="contained"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            fullWidth
            size="large"
            type={"submit"}
          >
            Publish
          </Button>
        </form>
      )}
    </Container>
  );
};

export default NewPost;
