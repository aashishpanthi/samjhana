import { useEffect, useState } from "react";
import FeaturedPost from "../components/FeaturedPost";
import PostCard from "../components/PostCard";
import "./styles/signedinhome.css";
import firebase from "../firebase";
import "firebase/compat/database";
import { Helmet } from "react-helmet";

function SignedInHome() {
  const [postsList, setPostsList] = useState();

  useEffect(() => {
    const postRef = firebase.database().ref("Posts");
    postRef.on("value", (snapshot) => {
      const posts = snapshot.val();
      const postList = [];
      for (let post in posts) {
        postList.push({
          id: post,
          ...posts[post],
        });
      }

      setPostsList(postList);
    });
  }, []);

  return (
    <section className="posts-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore posts - Samjhana </title>
      </Helmet>
      {postsList && <FeaturedPost post={postsList[postsList.length - 1]} />}
      <div className="posts">
        {postsList &&
          postsList.map(
            (post, index) =>
              index !== (postsList.length-1) && <PostCard key={post.id} post={post} />
          )}
      </div>
    </section>
  );
}

export default SignedInHome;
