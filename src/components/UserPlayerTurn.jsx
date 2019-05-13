import React from "react";
import AnimateBoardMovement from "./AnimateBoardMovement";
import TurnNotification from "./TurnNotification";
import CardController from "./CardController";

import { connect } from "react-redux";
import { updatePlayerCards, updatePlayerMoney, updatePlayerDay } from "../actions/userActions";

class UserPlayerTurn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      showTurnNotification: true
    };
  }

  componentDidMount() {
    this.setState({ player: this.props.player }, () => {
      setTimeout(() => {
        this.setState({ showTurnNotification: false });
      }, 3000);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singlePlayerTurnResult != this.props.singlePlayerTurnResult) {
      this.setState({
        animateMovement: true,
        finalPlayerState: this.props.singlePlayerTurnResult
      });
    }
  }

  completeBoardMovement = () => {
    this.setState({ animateMovement: false }, () => {
      this.parseTurnResult();
    });
  };

  updatePosition = newPosition => {
    this.props.updatePlayers(newPosition);
  };

  makeCardDecision = () => {
    this.setState({ drewMail: false });
    this.props.finishPlayerTurn(true);
  };

  parseTurnResult = () => {
    let result = this.state.finalPlayerState;
    if (result["mailCard"]) {
      this.setState({ drewMail: true, card: result["mailCard"] }, () => {
        setTimeout(() => {
          this.setState({ drewMail: false });
          this.props.finishPlayerTurn(true);
          this.props.updatePlayerCards(result["mailCard"]);
        }, 5000);
      });
    } else if (result["opportunityCardResult"]) {
      this.setState({
        drewOppourtunity: true,
        drewMail: true,
        card: result["opportunityCardResult"]["card"]
      });
      this.props.updatePlayerCards(result["opportunityCardResult"]["card"]);
    } else {
      this.props.finishPlayerTurn(true);
    }
    console.log(result);
    this.props.updatePlayerMoney(result["moneyDifference"]);
    this.props.updatePlayerDay(result["currentDay"]);
  };

  render() {
    if (this.state.animateMovement) {
      return (
        <AnimateBoardMovement
          playerId={this.state.player["playerId"]}
          currentPosition={this.state.player["day"]}
          targetPosition={this.state.finalPlayerState["currentDay"]}
          completeBoardMovement={this.completeBoardMovement}
          updatePosition={this.updatePosition}
        />
      );
    }
    if (this.state.showTurnNotification) {
      return <TurnNotification username="Your Turn!" />;
    }
    if (this.state.drewMail) {
      return (
        <CardController
          userPlayer={this.state.player}
          makeCardDecision={this.makeCardDecision}
          requiresDecision={this.state.drewOppourtunity}
          card={this.state.card}
        />
      );
    }
    return null;
  }
}

export default connect(
  null,
  { updatePlayerCards, updatePlayerMoney, updatePlayerDay }
)(UserPlayerTurn);
