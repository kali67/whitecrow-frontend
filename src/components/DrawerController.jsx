import React from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Spinner from "./Spinner";

export default class DrawerController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userPlayer: null,
      playerTurn: 0
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.playerTurn !== props.playerTurn) {
      return {
        playerTurn: props.playerTurn
      };
    }
    return null;
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`/game/${params.id}/player`, {
        auth: {
          username: "hta55",
          password: "welcome1"
        }
      })
      .then(response => {
        let yourPlayer = {
          id: response.data["id"],
          mail: response.data["mailCards"],
          op: response.data["opportunityCards"],
          day: response.data["day"],
          money: response.data["money"],
          username: response.data["username"]
        };
        this.setState({
          userPlayer: yourPlayer,
          loading: false
        });
        this.props.setUserPlayerID(yourPlayer.id);
      });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <Dashboard
        gameId={this.props.gameId}
        rollDie={this.props.rollDie}
        playerTurn={this.state.playerTurnIndex}
        userPlayer={this.state.userPlayer}
        updatePlayerPositions={this.props.updatePlayerPositions}
      />
    );
  }
}
