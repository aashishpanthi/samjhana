import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import "./styles/generatecard.css";
import { Button } from "@mui/material";
import skybackgroundImg from "../images/skybackground.jpg";
import cardbg from "../images/cardbg.jpg";
import { Helmet } from "react-helmet";

const GenerateCard = () => {
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <section className="card-generate-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Generate Sympathy Card - Samjhana</title>
      </Helmet>
      <div ref={ref} className="card-container">
        <img src={cardbg} alt="" />
        <h1 className="main-text" contentEditable="true">
          Thinking of you
        </h1>
        <p className="sub-text" contentEditable="true">
          I hope you feel surrounded by much love
        </p>
        <span className="person-name" contentEditable="true">
          My dear ......
        </span>
      </div>
      <Button variant="outlined" onClick={onButtonClick} size="large">
        Download PNG
      </Button>
    </section>
  );
};

export default GenerateCard;
