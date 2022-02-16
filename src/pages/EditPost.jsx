import { useState, useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Box,
} from "@mui/material";
import firebase from "../firebase";
import "firebase/compat/database";
import { UserContext } from "../userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preview from "../components/Preview";
import PostEdit from "../components/PostEdit";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const EditPost = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const userInfo = useContext(UserContext);
  const { user } = userInfo;
  const [mode, setmode] = useState("edit");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [postFound, setPostFound] = useState(false);

  const { id } = useParams();

  const setPost = (post) => {
    settitle(post.title);
    setdescription(post.description);
    setValue(post.body);
    setImage(post.image);
  };

  useEffect(() => {
    firebase
      .database()
      .ref("Posts")
      .child(id)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() === null) {
          toast.error("No post found.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (snapshot.val().creator === user._delegate.uid) {
          setPostFound(true);
          setPost(snapshot.val());
        } else {
          toast.error("You are not authorized to edit this post", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => ({
        errorCode: error.code,
        errorMessage: error.message,
      }));
  }, []);

  const savePost = (e) => {
    e.preventDefault();
    setLoading(true);
    const postRef = firebase.database().ref("Posts");
    const post = {
      title,
      description,
      body: value,
      image,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    };

    postRef.child(id).update(post);

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
    return <div>You need to login to Edit a post</div>;
  }

  return (
    <>
      {postFound ? (
        <Container style={{ marginTop: "2rem" }} maxWidth="lg">
          <Helmet>
                <meta charSet="utf-8" />
                <title>{title} - Samjhana</title>
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
                Edit Post
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
      ) : (
        <Box component="section" sx={{ p: 2, mt: 2, textAlign: "center" }}>
          <CircularProgress size="large" />
        </Box>
      )}
    </>
  );
};

export default EditPost;
