import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import {
  Container,
  Typography,
  Divider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";

const NewPost = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [mode, setmode] = useState("edit");

  return (
    <Container style={{ marginTop: "2rem" }} maxWidth="lg">
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
          <Typography variant="h4" component="h2" gutterTop>
            Preview
          </Typography>
          <Box component="section" sx={{ p: 2, mt: 2, border: "1px solid gray" }}>
            <MDEditor.Markdown
              source={value}
              rehypePlugins={[[rehypeSanitize]]}
            />
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            New Post
          </Typography>
          <MDEditor
            value={value}
            onChange={setValue}
            height={400}
            toolbarHeight={50}
            preview="edit"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </>
      )}
    </Container>
  );
};

export default NewPost;
