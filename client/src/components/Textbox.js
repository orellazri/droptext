import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as crypto from "../utils/crypto";

const textareaStyle = {
  height: "95%",
  border: "2px solid #cecece",
  outline: 0,
  fontFamily: "monospace",
};

const Textbox = (props) => {
  const [content, setContent] = useState("Enter text here...");
  const contentRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    contentRef.current.select();
  }, []);

  const keydownHandler = (e) => {
    // CTRL + Enter to create
    if (e.keyCode === 13 && e.ctrlKey) {
      create();
    }
  };

  const create = async () => {
    if (!content.trim()) return;

    let { encrypted, privateKey } = crypto.encrypt(content);

    try {
      let result = await axios.post("/create", {
        content: encrypted,
      });
      const { id } = result.data;

      history.push("/" + id + "$" + privateKey);
    } catch (e) {
      console.log("An error occured trying to send encrypted text to server");
      console.log(e);
    }
  };

  return (
    <>
      <Form.Control
        ref={contentRef}
        as="textarea"
        style={textareaStyle}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={keydownHandler}
      />

      <div className="d-grid gap-2" style={{ marginTop: "1rem" }}>
        <Button onClick={create}>Create (CTRL + Enter)</Button>
      </div>
    </>
  );
};

export default Textbox;
