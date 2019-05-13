import React from "react";
import axios from "axios";

import CardModal from "./CardModal";

export default class CardController extends React.Component {
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
        this.props.makeCardDecision(true);
      });
  };

  declineCard = () => {
    let player = this.state.userPlayer;
    player["op"] = [...player["op"], this.state.card];
    player["money"] = player["money"] + this.state.card["cost"];
    this.props.updatePlayerDrawer(player);
    this.props.makeCardDecision(false);
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
