import { Link } from "react-router-dom";
import photo404 from "../images/404page.svg";
import "./styles/PageNotFound.css";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet";

const PageNotFound = () => (
  <div className="page404-container">
    <Helmet>
        <meta charSet="utf-8" />
        <title>Page Not Found - Samjhana </title>
      </Helmet>
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
