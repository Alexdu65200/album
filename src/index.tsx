import React from "react";
import ReactDOM from "react-dom";
import { servicesVersion } from "typescript";
import App from "./App";
import * as serviceWorker from './serviceWorker'
import "./styles/globalStyles.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.register()