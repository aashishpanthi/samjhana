import React, { useState } from "react";
import { UserContext } from "./userContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInScreen from "./pages/SignInScreen";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<SignInScreen />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
