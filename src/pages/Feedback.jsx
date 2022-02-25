import { TextField, Button } from "@mui/material";
import { useState } from "react";
import "./styles/Feedback.css";
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [name, setName] = useState("Anonymous");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "feedback": event.target.getAttribute("name"),
        ...name,
      }),
    })
      .then(() =>{
        swal({
            text: "Thank you for your feedback!",
            buttons: {
                cancel : {
                    text: "Cancel",
                    value: null,
                    visible: true,
                }
            },
            icon: "success",
        })
        navigate("/")
      } )
      .catch((error) => alert(error));
  };

  return (
    <form
      className="feedback-form"
      name="feedback"
      method="post"
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="feedback" />

      <p className="form-head">
        We will be more than happy to receive your feedback.
      </p>
      <div className="form-body">
        <TextField
          id="name-feedback"
          label="Your name"
          name="name"
          helperText="Your name is optional"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <br />

        <TextField
          id="message-feedback"
          name="message"
          label="Message"
          multiline
          maxRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          helperText="Write what you didn't like about the platform."
          fullWidth
        />

        <br />

        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Feedback;
