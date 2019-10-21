import React from "react";
import PlayerPositionTile from "./PlayerPositionTile";
import Tile from "./Tile";

const NUMBER_DAYS_MONTH = 31;

export default class BoardTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.players !== props.players) {
      return {
        players: props.players
      };
    }
    return null;
  }

  /**
   * Determines which players are on the given board tile.
   * Keeps track of player objects on the tile through state changes, this
   * is where player progressions are managed.
   */
  checkPlayerPositions = () => {
    let date = this.props.date;
    let playerPositions = this.state.players.map(el => el.day);
    let playersOnTile = [];
    for (let i = 0; i < playerPositions.length; i++) {
      if (date === playerPositions[i] % (NUMBER_DAYS_MONTH + 1)) {
        playersOnTile.push(this.state.players[i]);
      }
    }
    return playersOnTile;
  };

  render() {
    if (this.checkPlayerPositions().length > 0) {
      return <PlayerPositionTile {...this.props} players={this.checkPlayerPositions()} />;
    }
    return <Tile {...this.props} />;
  }
}
