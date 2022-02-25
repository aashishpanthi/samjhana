import "./styles/privacypolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacyPolicy">
      <h1 className="privacyPolicyHeading">
        <strong>Privacy Policy</strong>
      </h1>

      <p className="privacyPolicyParagraph">
        You are secure 🔐 in this website. This website make use of Firebase
        Authentication. And we only make you sign in to identify who you are and
        give you permission over your content.
        <br />
        <br />
        There is no way that we collect your data and sell it. No one knows who
        posted something in a website except the owner and firebase dashboard
        😉.
      </p>

      {/* Add that's it gif */}
      <img
        src="https://media0.giphy.com/media/2uA1EH7nwJT65sJJPl/giphy.gif"
        className="privacyPolicyGif"
      />
    </div>
  );
}

export default PrivacyPolicy;
