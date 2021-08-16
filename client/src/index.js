import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL =
  process.env.ENVIRONMENT == "development"
    ? "http://localhost:8080"
    : "https://droptext-server.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
