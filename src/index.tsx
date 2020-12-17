import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider as AlertProvider } from "react-alert";

import App from "./App";
import AlertOptions from "./AlertOptions";

ReactDOM.render(
    <AlertProvider {...AlertOptions}>
        <App />
    </AlertProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
