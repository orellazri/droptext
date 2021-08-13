import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Textbox from "./components/Textbox";
import HowItWorks from "./components/HowItWorks";
import ViewPage from "./pages/ViewPage";

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
    <Router>
      <Container fluid style={{ padding: "1rem", height: "95vh" }}>
        <HowItWorks />
        <Switch>
          <Route path="/:idAndKey" children={<ViewPage />} />
          <Route path="/">{content}</Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
