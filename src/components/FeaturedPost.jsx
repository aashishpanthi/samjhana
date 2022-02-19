import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

const FeaturedPost = (props) => {
  if (!props.post) {
    return <Typography variant="h6">No post found</Typography>;
  }

  const { id, title, description, createdAt, image } = props.post;
  return (
    <Grid item xs={12} style={{ minWidth: "65vw" }}>
      <Link to={`/posts/${id}`} style={{ textDecoration: "inherit" }}>
        <CardActionArea>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {new Date(createdAt).toString().substring(4, 15)}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image={
                image
                  ? image
                  : "https://lh3.googleusercontent.com/pw/AM-JKLVqiCfXh8SUHtqLCanL98NJlsuWO5fSHOI23lXpfnhvoeC4MSRtbJPTz1RcfXSW0gWx1o9AoLu_RovqslCo5i4b4Xzr2KxQqCbU04RA68qYCGWi0kDx0VpSXWSMpgbgrVRfFWyQug9xTjffsGR1zv2w=w1280-h720-no"
              }
              alt={title}
            />
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
};

export default FeaturedPost;
