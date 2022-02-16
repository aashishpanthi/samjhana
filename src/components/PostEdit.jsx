import {
  Typography,
  Button,
  TextField,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { DropzoneDialog } from "material-ui-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PublishIcon from "@mui/icons-material/Publish";
import { LoadingButton } from "@mui/lab";
import { storage } from "../firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { useState } from "react";

const PostEdit = ({post}) => {
    const {title, settitle, description, setdescription, setImage, value, setValue, loading} = post;

    const [open, setOpen] = useState(false);
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

  return (
    <>
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
    </>
  );
};

export default PostEdit;
