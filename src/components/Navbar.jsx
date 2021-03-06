import { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { UserContext } from "../userContext";
import firebase from "../firebase";
import "firebase/auth";

const pages = [
  { name: "Home", link: "/" },
  { name: "Generate card", link: "/generatecard" },
  { name: "New post", link: "/new" },
  { name: "My posts", link: "/myposts" },
  { name: "Feedback", link: "/feedback" },
];
const settings = [];

const Navbar = ({ props }) => {
  const { handleClickOpen } = props;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userInfo = useContext(UserContext);
  const { user, setUser } = userInfo;

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
    return () => unregisterAuthObserver(); 
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    firebase.auth().signOut();
    handleCloseUserMenu();
  };

  return (
    <AppBar color="primary" position="static" className="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              className="navbar__logo"
            >
              Samjhana
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.link}
                    className="navbar__link"
                  >
                    <Typography textAlign="center" >{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            className="navbar__link__mobile"
            style={{ color: "inherit", textDecoration: "none" }}
            to="/"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              className="navbar__logo"
            >
              Samjhana
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.link}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                className="navbar__link"
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {user == null ? (
            <Button
              variant="outlined"
              style={{ color: "inherit", borderColor: "inherit" }}
              onClick={handleClickOpen}
            >
              Login
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="More options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="name" src={user._delegate.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
