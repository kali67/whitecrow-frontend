import React from "react";

import GameBrowserTable from "../components/GameBrowserTable";
import CreateGameForm from "../components/CreateGameForm";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  componentDidMount() {
    document.getElementById("root").style = "background: #ffffff;";
  }

  render() {
    return (
      <React.Fragment>
        <CreateGameForm {...this.props} />
        <GameBrowserTable {...this.props} />
      </React.Fragment>
    );
  }
}
