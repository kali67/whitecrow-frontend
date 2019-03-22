import React from "react";
import Modal from "react-modal";
import axios from "axios";

import Card from "./Card";
import Spinner from "./Spinner";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    height: "65%",
    width: "65vw",
    top: "50%",
    left: "50%",
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
    backgroundColor: "rgba(0,0,0,0.75)"
  }
};

export default class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      loading: true,
      cards: []
    };
  }

  componentDidMount() {
    axios
      .get("/cards/mail")
      .then(response => {
        this.setState({ cards: response.data, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.props.onClose();
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}>
            {this.state.cards.map(card => {
              return <Card card={card} />;
            })}
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
