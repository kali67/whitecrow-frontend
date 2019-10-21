import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import Card from "./Card";
import { SpinnerFullCircle } from "../Animations/Spinner";
import { Button } from "@atlaskit/button/components/Button";
import { Translate } from "react-localize-redux";

Modal.setAppElement("#root");

/**
 * Card modal for displaying mail cards or
 * posing the decision for opportunity cards.
 * This class also handles the displaying of accepted or
 * rejected opportunity cards from AI players.
 */
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
        <ModalCardWrapper style={{ maxWidth: "300px" }}>
          {!this.props.requiresDecision ? (
            <NotifyFinishedRead dismissCardModel={this.props.dismissCardModel} />
          ) : (
            <Padding />
          )}
          <Card card={this.state.card} />
        </ModalCardWrapper>
        {this.props.decision ? <CardDecisionOutcome decision={this.props.decision} /> : null}
        {this.props.requiresDecision ? (
          <CardDecisionControls
            accept={() => this.props.addOpportunityCard(this.state.card)}
            loadingAdd={this.props.loadingAdd}
            loadingDecline={this.props.loadingDecline}
            declineCard={this.props.declineCard}
          />
        ) : null}
        {this.props.cardCancelled ? <CardDecisionOutcome cardCancelled={true} /> : null}
      </Modal>
    );
  }
}

/**
 * Controls for card interactions. This component deals
 * with the accepting or declining of opportunity cards and
 * also the controls with reading cards.
 */
const CardDecisionControls = props => {
  return (
    <ButtonWrapper>
      <Button
        isLoading={props.loadingDecline}
        appearance="danger"
        style={{
          width: "110px",
          justifyContent: "center"
        }}
        onClick={() => {
          props.declineCard();
        }}>
        <Translate id="decline-btn" />
      </Button>
      <Button
        isLoading={props.loadingAdd}
        appearance="primary"
        onClick={() => {
          props.accept();
        }}
        style={{
          background: "green",
          width: "110px",
          justifyContent: "center"
        }}>
        <Translate id="accept-btn" />
      </Button>
    </ButtonWrapper>
  );
};

/**
 * This component handles the display of the
 * finished reading button on cards.
 *
 * @param {dismissCardModel} props required for the button to render
 */
const NotifyFinishedRead = props => {
  return (
    <Button
      onClick={() => props.dismissCardModel()}
      style={{
        marginBottom: "50px",
        background: "#36B37E",
        width: "100%",
        height: "50px",
        justifyContent: "center"
      }}
      appearance="primary">
      <Translate id="finished-reading" />
    </Button>
  );
};

/**
 * Shows the outcome of AI player decisions. This
 * also handles the notification of cancellation of mail cards.
 *
 * @param {decision, cardCancelled} props
 */
const CardDecisionOutcome = props => {
  let decisionTextColor = props.decision === "DECLINED" ? "red" : "lime";
  if (props.cardCancelled) {
    return (
      <h1 style={{ color: decisionTextColor, textAlign: "center" }}>
        <Translate id="card-cancelled" />
      </h1>
    );
  }
  return (
    <h1 style={{ color: decisionTextColor, textAlign: "center" }}>
      {props.decision === "ACCEPTED" ? (
        <Translate id="accepted-decision" />
      ) : (
        <Translate id="declined-decision" />
      )}
    </h1>
  );
};

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
const Padding = styled.div`
  height: 70px;
  width: 100%;
`;
