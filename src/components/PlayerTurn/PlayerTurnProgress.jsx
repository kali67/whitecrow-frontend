import React from "react";
import AnimateBoardMovement from "../Animations/AnimateBoardMovement";
import CardController from "../Card/CardController";
import DieAnimation from "../Animations/DieAnimation";
import TurnNotification from "../Animations/TurnNotification";

const NOTIFICATION_DISPLAY_TIME_MS = 3000;

export default class PlayerTurnProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turnNotificator: false,
      player: null,
      finalPlayerState: null,
      animateMovement: false,
      roll: false,
      notificationText: "",
      isNestedTurnResult: false
    };
  }

  componentDidMount() {
    this.updateComponentState();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.finalPlayerState &&
      prevProps.finalPlayerState["playerId"] !== this.props.finalPlayerState["playerId"]
    ) {
      this.setState({ isNestedTurnResult: false });
      this.updateComponentState();
    }
    if (
      prevProps.finalPlayerState["turnResultIdentifier"] !==
      this.props.finalPlayerState["turnResultIdentifier"]
    ) {
      this.updateComponentState();
    }
  }

  hasPlayerFinishedGameAfterTurn = () => {
    return this.props.finalPlayerState["hasFinishedGame"];
  };

  hasPlayerFinishedBeforeTurn = () => {
    return this.props.player["hasFinishedGame"];
  };

  updatePlayerModel = () => {
    let player = this.props.player;
    player["hasFinishedGame"] = true;
    this.props.updatePlayerState(player);
  };

  updateComponentState = () => {
    if (this.props.finalPlayerState) {
      // we have found a turn result from server for this player
      if (this.hasPlayerFinishedBeforeTurn()) {
        this.props.finishPlayerTurn();
      } else {
        this.setState(
          {
            turnNotificator: true,
            player: this.props.player,
            finalPlayerState: this.props.finalPlayerState,
            notificationText: this.props.player["username"]
          },
          () => {
            if (!this.state.isNestedTurnResult) {
              setTimeout(() => {
                this.setState({ roll: true, turnNotificator: false });
              }, NOTIFICATION_DISPLAY_TIME_MS);
            } else {
              this.setState({ roll: true, turnNotificator: false });
            }
          }
        );
      }
    } else if (this.hasPlayerFinishedBeforeTurn()) {
      this.props.finishPlayerTurn();
    }
  };

  updatePosition = newPosition => {
    this.props.updatePlayersPosition(newPosition);
  };

  completeBoardMovement = () => {
    this.setState({ animateMovement: false }, () => {
      this.checkCards();
    });
  };

  finishTurn = () => {
    if (this.hasPlayerFinishedGameAfterTurn()) {
      this.updatePlayerModel();
    }

    let nestedTurnResult = this.state.finalPlayerState["turnResult"];
    // check if no other turn was made
    if (!nestedTurnResult) {
      this.props.finishPlayerTurn();
    } else {
      //if triggered set back we want to animate that turn also
      if (this.state.finalPlayerState["hasTriggeredSetBack"]) {
        this.props.flagSetBackRotation(true);
      }
      this.setState({ isNestedTurnResult: true });
      this.props.updatePlayerTurnResult(nestedTurnResult);
    }
  };

  checkCards = () => {
    if (this.state.finalPlayerState["mailCard"]) {
      this.setState({
        showCards: true,
        card: this.state.finalPlayerState["mailCard"]
      });
    } else if (this.state.finalPlayerState["opportunityCardResult"]) {
      this.setState({
        showCards: true,
        decision: this.state.finalPlayerState["opportunityCardResult"]["decision"],
        card: this.state.finalPlayerState["opportunityCardResult"]["card"]
      });
    } else {
      this.finishTurn();
    }
  };

  finishReadingCard = () => {
    this.setState({ showCards: false, decision: null }, () => {
      this.finishTurn();
    });
  };

  dieRollFinished = () => {
    this.setState({ roll: false, animateMovement: true });
  };

  render() {
    if (this.state.animateMovement) {
      return (
        <AnimateBoardMovement
          playerId={this.state.player["playerId"]}
          currentPosition={this.state.player["day"]}
          targetPosition={this.state.finalPlayerState["currentDay"]}
          completeBoardMovement={this.completeBoardMovement}
          hasFinishedGame={this.props.finalPlayerState["hasFinishedGame"]}
          updatePosition={this.updatePosition}
        />
      );
    }
    if (this.state.turnNotificator && !this.state.isNestedTurnResult) {
      return <TurnNotification text={this.state.notificationText} />;
    }
    if (this.state.showCards) {
      return (
        <CardController
          decision={this.state.decision}
          onClose={e => e.preventDefault()}
          readOnly={true}
          card={this.state.card}
          dismissCardModel={this.finishReadingCard}
        />
      );
    }
    if (this.state.roll) {
      return (
        <DieAnimation
          callback={this.dieRollFinished}
          number={this.state.finalPlayerState["currentDay"] - this.state.player["day"]}
        />
      );
    }
    return null;
  }
}
