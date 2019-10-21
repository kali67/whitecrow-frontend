import React from "react";
import axios from "axios";

import CardModal from "./CardModal";

import { connect } from "react-redux";
import { updatePlayerCards, updatePlayerMoney } from "../../actions/userActions";

class CardController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAdd: false,
      loadingDecline: false
    };
  }

  /**
   * Adds opportunity card to the player, this means that
   * the player has accepted the opportunity card. This method
   * also takes care of state management.
   *
   * @param card card for player to accept
   */
  addOpportunityCard = card => {
    let bearerToken = "Bearer " + localStorage.getItem("jwt");
    this.setState({ loadingAdd: true });
    axios
      .post(
        `/player/${this.props.userPlayer["id"]}/add/opportunity/${card["id"]["cardId"]}`,
        {},
        { headers: { Authorization: bearerToken } }
      )
      .then(() => {
        this.updatePlayerModelInState(card);
      });
  };

  /**
   * Updates player model in redux state. This is so that
   * cards are added to the drawer/card history. This method
   * also takes care of the money reduction after accepting
   * the card.
   *
   * @param card card to be added to player in redux state
   */
  updatePlayerModelInState = card => {
    this.props.updatePlayerCards(card);
    this.props.updatePlayerMoney(-card["cost"]);
    if (!this.props.isSetBackTurnResult) {
      this.endTurn(true);
    } else {
      this.props.makeCardDecision();
    }
    this.setState({ loadingAdd: false });
  };

  /**
   * Ends the player turn as the players
   * last possible move is to accept/decline
   * opportunity cards.
   *
   * @param didAddCard defaults to false. Signifies if
   * we are ending turning after adding card or declining
   * card.
   */
  endTurn = (didAddCard = false) => {
    if (!didAddCard) {
      this.setState({ loadingDecline: true });
    }
    let bearerToken = "Bearer " + localStorage.getItem("jwt");
    axios
      .post(`/game/${this.props.gameId}/end_turn`, {}, { headers: { Authorization: bearerToken } })
      .then(() => {
        this.setState({ loadingDecline: false });
        this.props.makeCardDecision();
      });
  };

  render() {
    return (
      <CardModal
        cardCancelled={this.props.cardCancelled}
        declineCard={this.endTurn}
        decision={this.props.decision}
        requiresDecision={this.props.requiresDecision}
        card={this.props.card}
        addOpportunityCard={this.addOpportunityCard}
        loadingAdd={this.state.loadingAdd}
        loadingDecline={this.state.loadingDecline}
        dismissCardModel={this.props.dismissCardModel}
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
