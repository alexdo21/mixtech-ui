import React from "react";
import ReactDomClient from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const root = ReactDomClient.createRoot(container);
root.render(    
    <Provider store={store}>
        <App/>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
