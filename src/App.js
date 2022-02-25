import React, { useState } from "react";
import { UserContext } from "./userContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import "./App.css";
import NewPost from "./pages/NewPost";
import GenerateCard from "./pages/GenerateCard";
import SignedInHome from "./pages/SignedInHome";
import Post from "./pages/Post";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import SignInPopup from "./components/SignInPopup";
import TermsAndCoditions from "./pages/TermsAndCoditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar props={{open, handleClickOpen }} />
        <SignInPopup props={{open, handleClose }} />
        <Routes>
          <Route exact path="/posts/:id" element={<Post />} />
          <Route exact path="/edit-post/:id" element={<EditPost />} />
          <Route exact path="/myposts" element={<MyPosts />} />
          <Route exact path="/new" element={<NewPost />} />
          <Route exact path="/generatecard" element={<GenerateCard />} />
          <Route exact path="/terms-and-conditions" element={<TermsAndCoditions />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/" element={user !== null ? (<SignedInHome />):(<Home handleClickOpen={handleClickOpen} />)} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
