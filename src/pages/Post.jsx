import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { CircularProgress, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import firebase from "../firebase";
import "firebase/compat/database";
import { Helmet } from "react-helmet";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    firebase
      .database()
      .ref("Posts")
      .child(id)
      .once("value")
      .then((snapshot) => setPost(snapshot.val()))
      .catch((error) => ({
        errorCode: error.code,
        errorMessage: error.message,
      }));
  }, []);

  return (
    <Container style={{ marginTop: "2rem" }} maxWidth="lg">
      {post ? (
        <Box component="section" sx={{ p: 2, mt: 2 }}>
          <Helmet>
              <meta charSet="utf-8" />
              <title>{post.title} - Samjhana</title>
          </Helmet>
          <div style={{ margin: "1rem auto 2rem auto", maxWidth: "1000px" }}>
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>

            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {new Date(post.createdAt).toString().substring(4, 15)}
            </Typography>

            {post.image !== null && (
              <img
                style={{
                  margin: "5px auto",
                  maxWidth: "100%",
                  maxHeight: "75vh",
                  display: "block",
                }}
                src={post.image}
                alt={post.title}
              />
            )}
            <MDEditor.Markdown
              source={post.body}
              rehypePlugins={[[rehypeSanitize]]}
            />
          </div>
        </Box>
      ) : (
        <Box component="section" sx={{ p: 2, mt: 2, textAlign: "center" }}>
          <CircularProgress size="large" />
        </Box>
      )}
    </Container>
  );
}

export default Post;
