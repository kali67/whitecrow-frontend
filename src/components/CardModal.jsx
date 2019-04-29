import React from "react";
import Modal from "react-modal";
import axios from "axios";

import Card from "./Card";
import Spinner from "./Spinner";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    height: "60%",
    width: "40%",
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
    backgroundColor: "rgba(0,0,0,0.75)"
  }
};

export default class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      loading: true,
      card: {}
    };
  }

  componentDidMount() {
    if (!this.props.readOnly) {
      if (this.props.isMail) {
        axios
          .post(
            `/game/${this.props.gameId}/mail/card/draw?lang=en`,
            {},
            {
              auth: {
                username: "hta55",
                password: "welcome1"
              }
            }
          )
          .then(response => {
            this.setState({ card: response.data, loading: false });
            this.props.addMailCard(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        axios
          .get(`/opportunity/card/draw`, {
            auth: {
              username: "hta55",
              password: "welcome1"
            }
          })
          .then(response => {
            console.log(response);
            this.setState({ card: response.data[0], loading: false });
            // this.props.addMailCard(response.data[0]);
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      this.setState({ card: this.props.card, loading: false });
    }
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
            <Card card={this.state.card} />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
