import React from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Spinner from "./Spinner";

export default class DrawerController extends React.Component {
  render() {
    return (
      <Dashboard
        gameId={this.props.gameId}
        rollDie={this.props.rollDie}
        playerTurn={this.props.playerTurnIndex}
        userPlayer={this.props.userPlayer}
        updatePlayerPositions={this.props.updatePlayerPositions}
      />
    );
  }
}
