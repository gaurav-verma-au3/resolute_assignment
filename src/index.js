import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <SnackbarProvider
    maxSnack={1}
    autoHideDuration={1000}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
