import React from "react";
import axios from "axios";
import Spinner from "./Spinner";
import EndGameView from "./EndGameView";
import GameBoard from "./GameBoard";

export default class EndGameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gameData: null
    };
  }
  componentDidMount() {
    // document.getElementById("root").style = "background: #ffffff;";
    axios
      .post(
        `/game/${this.props.gameId}/end`,
        {},
        {
          auth: {
            username: "hta55",
            password: "welcome1"
          }
        }
      )
      .then(response => {
        this.setState({ loading: false, gameData: response["data"] });
      });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <React.Fragment>
        <GameBoard players={this.props.players} />
        <EndGameView gameData={this.state.gameData} />
      </React.Fragment>
    );
  }
}
