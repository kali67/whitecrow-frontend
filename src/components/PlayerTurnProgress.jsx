import React from "react";
import AnimateBoardMovement from "./AnimateBoardMovement";
import CardController from "./CardController";
import DieAnimation from "./DieAnimation";
import TurnNotification from "./TurnNotification";

export default class PlayerTurnProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turnNotificator: false,
      player: null,
      finalPlayerState: null,
      animateMovement: false,
      roll: false
    };
  }

  componentDidMount() {
    this.updateComponentState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.player != this.props.player) {
      this.updateComponentState();
    }
  }

  updateComponentState = () => {
    this.setState(
      {
        turnNotificator: true,
        player: this.props.player,
        finalPlayerState: this.props.finalPlayerState
      },
      () => {
        setTimeout(() => {
          this.setState({ roll: true, turnNotificator: false });
        }, 3000);
      }
    );
  };

  updatePosition = newPosition => {
    this.props.updatePlayers(newPosition);
  };

  completeBoardMovement = () => {
    this.setState({ animateMovement: false }, () => {
      this.checkCards();
    });
  };

  finishTurn = () => {
    if (this.state.finalPlayerState["gameEnding"] == true) {
      this.props.endGame();
    } else {
      this.props.finishPlayerTurn();
    }
  };

  checkCards = () => {
    if (this.state.finalPlayerState["mailCard"]) {
      this.setState(
        {
          showCards: true,
          card: this.state.finalPlayerState["mailCard"]
        },
        () => {
          setTimeout(() => {
            this.setState({ showCards: false }, () => {
              this.finishTurn();
            });
          }, 5000);
        }
      );
    } else if (this.state.finalPlayerState["opportunityCardResult"]) {
      this.setState(
        {
          showCards: true,
          decision: this.state.finalPlayerState["opportunityCardResult"]["decision"],
          card: this.state.finalPlayerState["opportunityCardResult"]["card"]
        },
        () => {
          setTimeout(() => {
            this.setState({ showCards: false, decision: null }, () => {
              this.finishTurn();
            });
          }, 5000);
        }
      );
    } else {
      this.finishTurn();
    }
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
          updatePosition={this.updatePosition}
        />
      );
    }
    if (this.state.turnNotificator) {
      return <TurnNotification username={this.state.player["username"].toUpperCase()} />;
    }
    if (this.state.showCards) {
      return (
        <CardController
          decision={this.state.decision}
          onClose={e => e.preventDefault()}
          readOnly={true}
          card={this.state.card}
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
