import { useState, useContext } from "react";
import {
  Container,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import firebase from "../firebase";
import "firebase/compat/database";
import { UserContext } from "../userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preview from "../components/Preview";
import PostEdit from "../components/PostEdit";
import { Helmet } from "react-helmet";

const NewPost = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const userInfo = useContext(UserContext);
  const { user } = userInfo;
  const [mode, setmode] = useState("edit");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const savePost = (e) => {
    e.preventDefault();
    setLoading(true);
    const postRef = firebase.database().ref("Posts");
    const post = {
      creator: user.uid,
      title,
      description,
      body: value,
      image,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    };

    postRef.push(post);

    setLoading(false);

    toast.success("Post published successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!user) {
    return <div>You need to login to create a post</div>;
  }

  return (
    <Container style={{ marginTop: "2rem" }} maxWidth="lg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>New post - Samjhana </title>
      </Helmet>
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
        <Preview post={{ title, description, image, value }} />
      ) : (
        <form onSubmit={savePost}>
          <Typography variant="h4" gutterBottom>
            New Post
          </Typography>

          <PostEdit
            post={{
              title,
              settitle,
              description,
              setdescription,
              setImage,
              value,
              setValue,
              loading,
            }}
          />
        </form>
      )}
    </Container>
  );
};

export default NewPost;
