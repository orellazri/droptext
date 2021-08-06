import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

import Textbox from "./components/Textbox";

const App = () => {
  const [support, setSupport] = useState(true);

  useEffect(() => {
    if (!("crypto" in window) || !("getRandomValues" in window.crypto)) {
      setSupport(false);
    }
  }, []);

  const content = support ? (
    <>
      <Textbox />
    </>
  ) : (
    <>
      Your browser does not support cyptography. Please use a recent version of Chrome or Firefox.
    </>
  );

  return (
    <Container fluid style={{ marginTop: "2rem" }}>
      {content}
    </Container>
  );
};

export default App;
