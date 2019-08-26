import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";

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
            <ModalText>The project has been set back! Go back 1 day.</ModalText>
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
