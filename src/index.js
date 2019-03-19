import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./index.css";
import App from "./components/App";

axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.render(<App />, document.getElementById("root"));
