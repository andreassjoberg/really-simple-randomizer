import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import * as serviceWorker from "./serviceWorker";

import "./style/App.scss";
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Fragment>
        <App />
        <ToastContainer
            newestOnTop
            pauseOnHover
            theme="colored"
        />
    </Fragment>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
