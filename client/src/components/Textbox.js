import React, { useState, useRef, useEffect } from "react";
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

  const create = () => {
    if (!content.trim()) return;
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
