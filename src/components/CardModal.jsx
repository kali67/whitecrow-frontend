import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import Card from "./Card";
import { SpinnerFullCircle } from "./Spinner";
import { Button } from "@atlaskit/button/components/Button";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    height: "100%",
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
    flexDirection: "column",
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
      loading: true,
      card: {}
    };
  }

  componentDidMount() {
    this.setState({ card: this.props.card, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <SpinnerFullCircle />;
    }
    return (
      <Modal isOpen={true} style={customStyles}>
          <ModalCardWrapper>
              {!this.props.requiresDecision ? <NotifyFinishedRead dismissCardModel={this.props.dismissCardModel} />: <Padding />}
              <Card card={this.state.card} />
          </ModalCardWrapper>
          {this.props.decision ? (
              <CardDecisionOutcome decision={this.props.decision} />
          ) : null}
          {this.props.requiresDecision ? (
              <CardDecisionControls
                  accept={() => this.props.addOpportunityCard(this.state.card)}
                  loading={this.props.loadingAdd}
                  declineCard={this.props.declineCard}
              />
          ) : null}

      </Modal>
    );
  }
}

const ModalCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 55%;
  max-width: 300px;
  flex-direction: column
  min-height: 500px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5%;
  min-width: 55%;
  max-width: 300px;
`;

const CardDecisionControls = props => {
  return (
    <ButtonWrapper>
      <Button
        appearance="danger"
        style={{
          width: "110px",
          justifyContent: "center"
        }}
        onClick={() => {
          props.declineCard();
        }}
      >
        Decline
      </Button>
      <Button
        loading={props.loading}
        appearance="primary"
        onClick={() => {
          props.accept();
        }}
        style={{
          background: "green",
          width: "110px",
          justifyContent: "center"
        }}
      >
        Accept
      </Button>
    </ButtonWrapper>
  );
};

const NotifyFinishedRead = props => {
  return (
      <Button
          onClick={() => props.dismissCardModel()}
          style={{
              marginBottom: "50px",
              background: "#36B37E",
              // minWidth: "61%",
              // maxWidth: "350px",
              width:"100%",
              height: "50px",
              justifyContent: "center"
          }}
          appearance="primary"
      >
          Finished Reading!
      </Button>

  );
};

const Padding = styled.div`
    height: 70px;
    width: 100%
`;

const CardDecisionOutcome = props => {
  let decisionTextColor = props.decision === "ACCEPTED" ? "lime" : "red";
  return <h1 style={{ color: decisionTextColor }}>{props.decision}</h1>;
};
