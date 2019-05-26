import React from "react";
import AnimateBoardMovement from "./AnimateBoardMovement";
import TurnNotification from "./TurnNotification";
import CardController from "./CardController";

import { connect } from "react-redux";
import { updatePlayerCards, updatePlayerMoney, updatePlayerDay } from "../actions/userActions";

import {
  dismissTurnNotification,
  animatePlayerMovement,
  stopPlayerTurnAnimation,
  showDrawnCard,
  dismissCardModal,
  showDrawnOpportunityCard,
  showTurnNotification
} from "../actions/userTurnActions";

class UserPlayerTurn extends React.Component {
  componentDidMount() {
    this.startPlayerTurn();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userTurnResult !== this.props.userTurnResult) {
      this.startPlayerTurn();
      this.animateMovement();
    }
  }

  animateMovement = () => {
    if (this.props.playerStateBeforeTurn["day"] > this.props.userTurnResult["currentDay"]) {
      this.props.animatePlayerMovement();
    } else {
      this.props.animatePlayerMovement();
    }
  };

  startPlayerTurn = () => {
    if (this.playerHasFinishedGameBeforeTurn()) {
      setTimeout(() => {
        this.notifyPlayerFinishedGame();
        this.props.finishPlayerTurn(true);
      }, 3000);
    } else {
      this.props.showTurnNotification();
      setTimeout(() => {
        this.props.dismissTurnNotification();
      }, 3000);
    }
  };

  notifyPlayerFinishedGame = () => {
    let player = this.props.playerStateBeforeTurn;
    player["hasFinishedGame"] = true;
    player["day"] = this.props.userTurnResult["currentDay"];
    this.props.updatePlayerState(player);
  };

  playerHasFinishedGameBeforeTurn = () => {
    return this.props.playerStateBeforeTurn["hasFinishedGame"];
  };

  playerHasFinishedGameAfterTurn = () => {
    return this.props.userTurnResult["hasFinishedGame"];
  };

  completeBoardMovement = () => {
    this.props.stopPlayerTurnAnimation();
    this.handleCardActions();
  };

  updatePosition = newPosition => {
    this.props.updatePlayersPosition(newPosition);
  };

  makeCardDecision = () => {
    this.props.dismissCardModal();
    this.props.finishPlayerTurn(true);
  };

  handleCardActions = () => {
    let playerStateAfterTurn = this.props.userTurnResult;
    let opportunityCardResult = playerStateAfterTurn["opportunityCardResult"];
    if (playerStateAfterTurn["mailCard"]) {
      this.props.showDrawnCard(playerStateAfterTurn["mailCard"]);
      setTimeout(() => {
        this.props.dismissCardModal();
        this.props.finishPlayerTurn(true);
        this.props.updatePlayerCards(playerStateAfterTurn["mailCard"]);
      }, 5000);
    } else if (opportunityCardResult) {
      this.props.showDrawnOpportunityCard(opportunityCardResult["card"]);
    } else {
      if (this.playerHasFinishedGameAfterTurn()) {
        this.notifyPlayerFinishedGame();
      }
      this.props.finishPlayerTurn(true);
    }
    this.props.updatePlayerMoney(playerStateAfterTurn["moneyDifference"]);
    this.props.updatePlayerDay(playerStateAfterTurn["currentDay"]);
  };

  render() {
    if (this.props.animateMovement) {
      return (
        <AnimateBoardMovement
          playerId={this.props.playerStateBeforeTurn["playerId"]}
          currentPosition={this.props.playerStateBeforeTurn["day"]}
          targetPosition={this.props.userTurnResult["currentDay"]}
          completeBoardMovement={this.completeBoardMovement}
          updatePosition={this.updatePosition}
          hasFinishedGame={this.props.userTurnResult["hasFinishedGame"]}
        />
      );
    }
    if (this.props.shouldShowTurnNotificator) {
      return <TurnNotification username="Your Turn!" />;
    }
    if (this.props.cardDrawn) {
      return (
        <CardController
          userPlayer={this.props.playerStateBeforeTurn}
          makeCardDecision={this.makeCardDecision}
          requiresDecision={this.props.isOpportunityCard}
          updatePlayerCards={this.props.updatePlayerCards}
          card={this.props.card}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  userTurnResult: state.game.userTurnResult,
  playerStateBeforeTurn: state.user.player,
  shouldShowTurnNotificator: state.userTurn.shouldShowTurnNotificator,
  animateMovement: state.userTurn.animateMovement,
  card: state.userTurn.card,
  cardDrawn: state.userTurn.cardDrawn,
  isOpportunityCard: state.userTurn.isOpportunityCard
});

export default connect(
  mapStateToProps,
  {
    updatePlayerCards,
    updatePlayerMoney,
    updatePlayerDay,
    dismissTurnNotification,
    animatePlayerMovement,
    stopPlayerTurnAnimation,
    showDrawnCard,
    dismissCardModal,
    showDrawnOpportunityCard,
    showTurnNotification
  }
)(UserPlayerTurn);
