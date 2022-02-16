import { Typography, Box } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const Preview = ({post}) => {
    const { title, description, image, value } = post;
  return (
    <>
      <Typography variant="h4" component="h2">
        Preview
      </Typography>
      <Box
        component="section"
        sx={{ p: 2, mt: 2 }}
        style={{ border: "1px solid gray" }}
      >
        <div style={{ margin: "1rem auto 2rem auto", maxWidth: "1000px" }}>
          <Typography variant="h3" component="h2">
            {title}
          </Typography>

          <Typography variant="subtitle1" paragraph>
            {description}
          </Typography>

          {image !== null && (
            <img
              style={{
                margin: "5px auto",
                maxWidth: "100%",
                maxHeight: "75vh",
                display: "block",
              }}
              src={image}
              alt={title}
            />
          )}
          <MDEditor.Markdown
            source={value}
            rehypePlugins={[[rehypeSanitize]]}
          />
        </div>
      </Box>
    </>
  );
};

export default Preview;
