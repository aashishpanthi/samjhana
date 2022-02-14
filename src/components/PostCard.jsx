import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const PostCard = ({post}) => {
  const { body, title, createdAt, creator, id } = post;

  return (
    <Card sx={{ maxWidth: 345 }} style={{margin:"5px"}}>
      <Link to={`/posts/${id}`} style={{textDecoration: "inherit", color:"inherit"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default PostCard;
