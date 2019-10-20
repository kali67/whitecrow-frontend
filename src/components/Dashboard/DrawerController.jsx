import React from "react";
import Dashboard from "./Dashboard";

export default class DrawerController extends React.Component {
  render() {
    return (
      <Dashboard
        gameId={this.props.gameId}
        rollDie={this.props.rollDie}
        updatePlayerPositions={this.props.updatePlayerPositions}
      />
    );
  }
}
