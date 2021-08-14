import { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { PatchQuestionFill } from "react-bootstrap-icons";

const Corner = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const HowItWorks = () => {
  const [show, setShow] = useState(false);

  return (
    <Corner>
      <Button variant="secondary" style={{ paddingBottom: "0.6rem" }} onClick={() => setShow(true)}>
        <PatchQuestionFill />
      </Button>

      <Modal show={show} size="lg">
        <Modal.Header>
          <Modal.Title>How It Works</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is a web app that allows you to send encrypted text fast.
          <br />
          It uses Node.js & Express for the server, React for the client and levelup as a persistent
          key-value database.
          <br />
          <br />
          After submitting your text, it gets encrypted locally, and a private key is also generated
          locally. The encrypted contents are sent to the server. The server sends back an ID, which
          lets you share your url that consists of the ID and the private key.
          <br />
          The server only knows the IDs and the encrypted contents. It cannot decrypt the text.
          <br />
          <br />
          <a href="https://github.com/orellazri/droptext">GitHub</a>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Corner>
  );
};

export default HowItWorks;
