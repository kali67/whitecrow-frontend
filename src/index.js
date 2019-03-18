import React from "react";
import ReactDOM from "react-dom";
import GameBoard from "./components/GameBoard";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.render(<GameBoard />, document.getElementById("root"));
