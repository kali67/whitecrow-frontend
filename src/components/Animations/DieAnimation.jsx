import React from "react";
import Modal from "react-modal";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import { Translate } from "react-localize-redux";
import styled from "styled-components";

import { ModalText, ModalBody } from "./TurnNotification";

Modal.setAppElement("#root");

export default class DieAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.reactDice = React.createRef();
    this.state = {
      isOpen: true
    };
  }

  /**
   * Mounts when die rolling is required. Begins the die
   * roll by passing a number defined by props.
   */
  componentDidMount() {
    if (this.props.number > 0) {
      setTimeout(() => {
        this.reactDice.rollAll([this.props.number]);
      }, 500);
    } else {
      setTimeout(() => {
        this.setState({ isOpen: false }, () => {
          this.props.callback();
        });
      }, 5000);
    }
  }

  /**
   * Callback once die rolling has finished. Calls passed
   * in callback after showing the stationary die for 2
   * seconds.
   */
  rollDoneCallback = () => {
    setTimeout(() => {
      this.props.callback();
    }, 2000);
  };

  render() {
    return (
      <Modal isOpen={this.state.isOpen} style={customStyles}>
        <ModalBody>
          {this.props.number < 0 ? (
            <ModalText>
              <Translate id="go-back" />
            </ModalText>
          ) : (
            <NonClickableDiv>
              <ReactDice
                faceColor="#ffffff"
                dotColor="#000000"
                dieSize={120}
                numDice={1}
                rollDone={() => {
                  this.rollDoneCallback();
                }}
                ref={dice => (this.reactDice = dice)}
              />
            </NonClickableDiv>
          )}
        </ModalBody>
      </Modal>
    );
  }
}

const NonClickableDiv = styled.div`
  pointer-events: none;
`;

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
