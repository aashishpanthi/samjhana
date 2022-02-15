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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DropzoneDialog } from "material-ui-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PublishIcon from "@mui/icons-material/Publish";
import { LoadingButton } from "@mui/lab";
import { storage } from "../firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";

const NewPost = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const userInfo = useContext(UserContext);
  const { user } = userInfo;
  const [mode, setmode] = useState("edit");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();

  const uploadImage = async (file) => {
    const metadata = {
      contentType: file.type,
    };

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

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
            <div style={{ margin: "1rem auto 2rem auto", maxWidth: "1000px", }}>
              <Typography variant="h3" component="h1">
                {title}
              </Typography>
              <Typography variant="h6" component="p">
                {description}
              </Typography>
              {image !== null && <img style={{ margin:"5px auto", maxWidth:"100%", maxHeight:"75vh", display: "block"}} src={image} alt={title} />}
            </div>
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
            variant="standard"
            id="post-title"
            label="Title"
            value={title}
            onChange={(event) => settitle(event.target.value)}
            margin={"dense"}
            required={true}
          />

          <TextField
            fullWidth
            id="post-description"
            variant="standard"
            label="Description"
            value={description}
            onChange={(event) => setdescription(event.target.value)}
            margin={"dense"}
            required={true}
          />

          <div style={{ margin: "1rem auto", textAlign: "center" }}>
            <label htmlFor="upload-button">Upload cover image: </label>
            <Button
              variant="contained"
              id="upload-button"
              color="primary"
              endIcon={<AddPhotoAlternateIcon />}
              fullWidth
              onClick={() => setOpen(true)}
              style={{ maxWidth: "300px" }}
            >
              Add Image
            </Button>

            <DropzoneDialog
              acceptedFiles={["image/*"]}
              cancelButtonText={"cancel"}
              submitButtonText={"Submit"}
              maxFileSize={1000000}
              filesLimit={1}
              open={open}
              onClose={() => setOpen(false)}
              onSave={(files) => {
                uploadImage(files[0]);
                setOpen(false);
              }}
              showPreviews={true}
              showFileNamesInPreview={true}
            />
          </div>

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

          <LoadingButton
            fullWidth
            size="large"
            color="primary"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            loading={loading}
            loadingPosition="start"
            startIcon={<PublishIcon />}
            variant="contained"
            type={"submit"}
          >
            Publish
          </LoadingButton>
        </form>
      )}
    </Container>
  );
};

export default NewPost;
