import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { description, title, image, id } = post;

  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "5px" }}>
      <Link
        to={`/posts/${id}`}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              image
                ? image
                : "https://lh3.googleusercontent.com/pw/AM-JKLVqiCfXh8SUHtqLCanL98NJlsuWO5fSHOI23lXpfnhvoeC4MSRtbJPTz1RcfXSW0gWx1o9AoLu_RovqslCo5i4b4Xzr2KxQqCbU04RA68qYCGWi0kDx0VpSXWSMpgbgrVRfFWyQug9xTjffsGR1zv2w=w1280-h720-no"
            }
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title.length > 20 ? `${title.substring(0, 20)}...` : title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.length > 75
                ? `${description.substring(0, 75)}...`
                : description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default PostCard;
