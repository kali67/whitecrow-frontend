import React from "react";

import GameBrowserTable from "../components/GameBrowserTable";
import CreateGameForm from "../components/CreateGameForm";

export default class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CreateGameForm {...this.props} />
        <GameBrowserTable {...this.props} />
      </React.Fragment>
    );
  }
}
