import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./index.css";
import "react-slide-out/lib/index.css";
import MainRouter from "./components/MainRouter";
import { Provider } from "react-redux";
import store from "./store";
import "@atlaskit/css-reset";

axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById("root")
);
