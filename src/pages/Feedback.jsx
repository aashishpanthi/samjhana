import { TextField, Button } from "@mui/material";
import { useState } from "react";
import "./styles/Feedback.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [name, setName] = useState("Anonymous");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElements = [...event.currentTarget.elements];
    const isValid =
      formElements.filter((elem) => elem.name === "bot-field")[0].value === "";

    const validFormElements = isValid ? formElements : [];

    if (validFormElements.length < 1) {
      swal("Invalid form", "Please fill out the form", "error");
    } else {
      const filledOutElements = validFormElements
        .filter((elem) => !!elem.value)
        .map(
          (element) =>
            encodeURIComponent(element.name) +
            "=" +
            encodeURIComponent(element.value)
        )
        .join("&");

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: filledOutElements,
      })
        .then(() => {
          swal({
            text: "Thank you for your feedback!",
            buttons: {
              cancel: {
                text: "Cancel",
                value: null,
                visible: true,
              },
            },
            icon: "success",
          });
          navigate("/");
        })
        .catch((error) => swal(error));
    }
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

      <input name="bot-field" hidden />

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
