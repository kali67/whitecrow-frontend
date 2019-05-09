import React from "react";
import Steps, { Step } from "rc-steps";
import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";

export default class PlayerTurnTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerTurn: 0
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.players !== props.players || props.playerTurn !== current_state.playerTurn) {
      return {
        players: props.players,
        playerTurn: props.playerTurn
      };
    }
    return null;
  }

  render() {
    return (
      <Steps labelPlacement="vertical" direction="vertical" current={this.state.playerTurn}>
        {this.state.players.map((player, i) => {
          let username = player.username;
          if (player.id == this.props.userPlayerId) {
            username = "YOU";
          }
          return <Step key={i} title={`${username} (day ${player.day})`} />;
        })}
      </Steps>
    );
  }
}
