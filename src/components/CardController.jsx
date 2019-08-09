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
    console.log(card);
    this.setState({ loading: true });
    axios
      .post(
        `/player/${this.props.userPlayer["id"]}/add/opportunity/${card["id"]["cardId"]}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        }
      )
      .then(() => {
        this.props.updatePlayerCards(card);
        this.props.updatePlayerMoney(-card["cost"]);
        this.declineCard()
      });
  };

  declineCard = () => {
    this.setState({ loading: true });
    axios
      .post(
        `/game/${this.props.gameId}/end_turn`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        }
      )
      .then(() => {
        this.props.makeCardDecision();
      });
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

const mapStateToProps = state => ({
  gameId: state.game.gameId
});

export default connect(
  mapStateToProps,
  { updatePlayerCards, updatePlayerMoney }
)(CardController);
