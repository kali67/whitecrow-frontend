import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import AnimateBoardMovement from "./AnimateBoardMovement";
import CardController from "./CardController";
import DieAnimation from "./DieAnimation";

const ModalText = styled.h1`
  font-size: 80px;
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
`;

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

  componentDidUpdate(prevProps) {
    if (
      (prevProps.player != this.props.player ||
        this.state.player != prevProps.player) &&
      this.props.finalPlayerState
    ) {
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
    }
  }

  updatePosition = newPosition => {
    this.props.updatePlayers(newPosition);
  };

  completeBoardMovement = () => {
    this.setState({ animateMovement: false }, () => {
      this.checkCards();
    });
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
            this.setState({ showCards: false }, () =>
              this.props.finishPlayerTurn()
            );
          }, 5000);
        }
      );
    } else if (this.state.finalPlayerState["opportunityCardResult"]) {
      this.setState(
        {
          showCards: true,
          decision: this.state.finalPlayerState["opportunityCardResult"][
            "decision"
          ],
          card: this.state.finalPlayerState["opportunityCardResult"]["card"]
        },
        () => {
          setTimeout(() => {
            this.setState({ showCards: false, decision: null }, () =>
              this.props.finishPlayerTurn()
            );
          }, 5000);
        }
      );
    } else {
      this.props.finishPlayerTurn();
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
      return (
        <TurnNotification
          username={this.state.player["username"].toUpperCase()}
        />
      );
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
          number={
            this.state.finalPlayerState["currentDay"] - this.state.player["day"]
          }
        />
      );
    }
    return null;
  }
}

export class SinglePlayerTurn extends React.Component {
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
        }, 5000);
      });
    } else if (result["opportunityCardResult"]) {
      this.setState({
        drewOppourtunity: true,
        drewMail: true,
        card: result["opportunityCardResult"]["card"]
      });
    } else {
      this.props.finishPlayerTurn(true);
    }
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

const TurnNotification = props => {
  return (
    <Modal isOpen={true} style={customStyles}>
      <ModalBody>
        <ModalText>{props.username}</ModalText>
      </ModalBody>
    </Modal>
  );
};

Modal.setAppElement("#root");

const customStyles = {
  content: {
    height: "65%",
    width: "65vw",
    top: "50%",
    left: "52%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: "0px",
    overflow: "hidden"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.9)"
  }
};
