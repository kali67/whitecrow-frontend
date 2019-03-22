import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import GameBoard from "./GameBoard";
import HomePage from "../pages/HomePage";
import CardModal from "./CardModal";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={CardModal} />
          <Route path="/" component={GameBoard} />
        </Switch>
      </BrowserRouter>
    );
  }
}
