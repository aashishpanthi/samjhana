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
          <CardMedia component="img" height="140" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default PostCard;
