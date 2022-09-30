import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App";

import "./style/App.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ToastContainer newestOnTop pauseOnHover theme="colored" />
  </React.StrictMode>
);
