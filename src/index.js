import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./index.css";
import "react-slide-out/lib/index.css";
import MainRouter from "./components/MainRouter";

axios.defaults.baseURL = "https://whitecrow-backend.herokuapp.com";

ReactDOM.render(<MainRouter />, document.getElementById("root"));
