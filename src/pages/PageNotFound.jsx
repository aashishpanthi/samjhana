import { Link } from "react-router-dom";
import photo404 from "../images/404page.svg";
import "./styles/PageNotFound.css";
import Button from "@mui/material/Button";

const PageNotFound = () => (
  <div className="page404-container">
    <img src={photo404} className="page404-content" alt="404 page not found" />
    <div style={{display:'flex', alignItems: "center"}}>
      <h1 style={{marginRight:"1rem"}}>404 - Page Not Found!</h1>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go home
      </Button>
    </div>
  </div>
);

export default PageNotFound;
