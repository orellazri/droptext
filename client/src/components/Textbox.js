import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as crypto from "../utils/crypto";

const textareaStyle = {
  height: "90vh",
  border: "2px solid #cecece",
  outline: 0,
  fontFamily: "monospace",
};

const Textbox = () => {
  const [content, setContent] = useState("Enter text here...");
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.select();
  }, []);

  const create = async () => {
    if (!content.trim()) return;

    let { encrypted, privateKey } = crypto.encrypt(content);

    try {
      let result = await axios.post("/create", {
        content: encrypted,
      });
      console.log("Your privte key is: " + privateKey);
    } catch (e) {
      console.log("An error occured trying to send encrypted text to server");
    }
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control
            ref={contentRef}
            as="textarea"
            style={textareaStyle}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
      </Form>

      {/* TODO: change to create on typing text */}
      <Button onClick={create}>Create</Button>
    </>
  );
};

export default Textbox;
