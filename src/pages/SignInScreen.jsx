// Import FirebaseAuth and firebase.
import { useEffect, useState, useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase";
import "firebase/compat/auth";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { Helmet } from "react-helmet";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  const userInfo = useContext(UserContext);
  const { setUser } = userInfo;
  const navigate = useNavigate();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          // console.log(user.uid);
        } else {
          setUser(null);
        }
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    navigate("/");
  }

  return (
    <div className="signInWholeScreen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign in - Samjhana </title>
      </Helmet>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen;
