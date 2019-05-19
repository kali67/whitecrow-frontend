import React from "react";
import axios from "axios";

import CardModal from "./CardModal";

import { connect } from "react-redux";
import { updatePlayerCards, updatePlayerMoney } from "../actions/userActions";

class CardController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  addOpportunityCard = card => {
    this.setState({ loading: true });
    axios
      .post(
        `/player/${this.props.userPlayer["id"]}/add/opportunity/${card["id"]}`,
        {},
        {
          auth: {
            username: "hta55",
            password: "welcome1"
          }
        }
      )
      .then(() => {
        this.props.updatePlayerCards(card);
        this.props.updatePlayerMoney(-card["cost"]);
        this.props.makeCardDecision();
      });
  };

  declineCard = () => {
    this.props.makeCardDecision();
  };

  render() {
    return (
      <CardModal
        declineCard={this.declineCard}
        decision={this.props.decision}
        requiresDecision={this.props.requiresDecision}
        card={this.props.card}
        addOpportunityCard={this.addOpportunityCard}
        loadingAdd={this.state.loading}
      />
    );
  }
}

export default connect(
  null,
  { updatePlayerCards, updatePlayerMoney }
)(CardController);
