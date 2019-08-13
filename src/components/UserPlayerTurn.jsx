import React from "react";
import AnimateBoardMovement from "./AnimateBoardMovement";
import TurnNotification from "./TurnNotification";
import CardController from "./CardController";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import {
  updatePlayerCards,
  updatePlayerDay,
  updatePlayerMoney
} from "../actions/userActions";

import {
  animatePlayerMovement,
  dismissCardModal,
  dismissTurnNotification,
  showDrawnCard,
  showDrawnOpportunityCard,
  showFullScreenNotification,
  stopPlayerTurnAnimation
} from "../actions/userTurnActions";

import { updateCurrentUserTurnResult } from "../actions/singlePlayerControllerActions";

import DieAnimation from "./DieAnimation";

const NOTIFICATION_DISPLAY_TIME_MS = 3000;

class UserPlayerTurn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingDieAnimation: false
    };
  }

  componentDidMount() {
    this.startPlayerTurn();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userTurnResult !== this.props.userTurnResult) {
      this.setState({ showingDieAnimation: true });
    }
  }

  startPlayerTurn = () => {
    if (this.playerHasFinishedGameBeforeTurn()) {
      this.notifyPlayerFinishedGame();
      this.props.finishPlayerTurn(true);
    } else {
      this.props.showFullScreenNotification(<Translate id="your-turn" />);
      setTimeout(() => {
        this.props.dismissTurnNotification();
      }, NOTIFICATION_DISPLAY_TIME_MS);
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

  finishTurn = () => {
    if (!this.props.userTurnResult["turnResult"]) {
      this.props.finishPlayerTurn(true);
    } else {
      if (this.props.userTurnResult["hasTriggeredSetBack"]) {
        this.props.showFullScreenNotification(
          "Uh, Oh! You have been set back!"
        );
        setTimeout(() => {
          this.props.dismissTurnNotification();
          this.props.updateCurrentUserTurnResult(
            this.props.userTurnResult["turnResult"]
          );
        }, NOTIFICATION_DISPLAY_TIME_MS);
      } else {
        this.props.updateCurrentUserTurnResult(
          this.props.userTurnResult["turnResult"]
        );
      }
    }
  };

  handleCardActions = () => {
    let playerStateAfterTurn = this.props.userTurnResult;
    let opportunityCardResult = playerStateAfterTurn["opportunityCardResult"];
    if (playerStateAfterTurn["mailCard"]) {
      this.props.showDrawnCard(playerStateAfterTurn["mailCard"]);
      setTimeout(() => {
        this.props.dismissCardModal();
        this.finishTurn();
        this.props.updatePlayerCards(playerStateAfterTurn["mailCard"]);
      }, 5000);
    } else if (opportunityCardResult) {
      this.props.showDrawnOpportunityCard(opportunityCardResult["card"]);
    } else {
      if (this.playerHasFinishedGameAfterTurn()) {
        this.notifyPlayerFinishedGame();
      }
      this.finishTurn();
    }
    this.props.updatePlayerMoney(playerStateAfterTurn["moneyDifference"]);
    this.props.updatePlayerDay(playerStateAfterTurn["currentDay"]);
  };

  dieRollFinished = () => {
    this.setState({ showingDieAnimation: false }, () =>
      this.props.animatePlayerMovement()
    );
  };

  render() {
    if (this.state.showingDieAnimation) {
      console.log("die animation");
      return (
        <DieAnimation
          callback={this.dieRollFinished}
          number={
            this.props.userTurnResult["currentDay"] -
            this.props.playerStateBeforeTurn["day"]
          }
        />
      );
    }
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
      return <TurnNotification username={this.props.notificationText} />;
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
  isOpportunityCard: state.userTurn.isOpportunityCard,
  notificationText: state.userTurn.notificationText
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
    showFullScreenNotification,
    updateCurrentUserTurnResult
  }
)(UserPlayerTurn);
