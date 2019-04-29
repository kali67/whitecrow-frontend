import React from "react";
import axios from "axios";

import CardModal from "./CardModal";

export default class CardController extends React.Component {
  constructor(props) {
    super(props);
  }

  addMailCard = card => {
    axios.post(
      `/player/${this.props.userPlayer["id"]}/add/mail/${card["id"]}`,
      {},
      {
        auth: {
          username: "hta55",
          password: "welcome1"
        }
      }
    );
    let player = this.props.userPlayer;
    player["mail"] = [...player["mail"], card];
    this.props.updatePlayerDrawer(player);
  };

  addOpportunityCard = card => {
    axios.post(
      `/player/${this.props.userPlayer["id"]}/add/opportunity/${card["id"]}`,
      {},
      {
        auth: {
          username: "hta55",
          password: "welcome1"
        }
      }
    );
    let player = this.props.userPlayer;
    player["op"] = [...player["op"], card];
    this.props.updatePlayerDrawer(player);
  };

  render() {
    return (
      <CardModal
        card={this.props.card}
        readOnly={this.props.readOnly}
        addMailCard={this.addMailCard}
        addOpportunityCard={this.addOpportunityCard}
        isMail={this.props.isMail}
        onClose={this.props.onClose}
        gameId={this.props.gameId}
      />
    );
  }
}
