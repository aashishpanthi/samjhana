import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInScreen from './components/SignInScreen';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<SignInScreen />} />
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
