import React from "react";
import Modal from "react-modal";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import {Translate} from "react-localize-redux";

import {ModalText, ModalBody} from "./TurnNotification";

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

export default class DieAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.reactDice = React.createRef();
    this.state = {
      isOpen: true
    }
  }

  componentDidMount() {
    if (this.props.number > 0) {
      setTimeout(() => {
        this.reactDice.rollAll([this.props.number]);
      }, 500);
    } else {
      setTimeout(() => {
       this.setState({isOpen: false}, () => {
         this.props.callback();
       })
      }, 5000);
    }
  }

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
            <ModalText><Translate id="go-back" /></ModalText>
          ) : (
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
          )}
        </ModalBody>
      </Modal>
    );
  }
}
