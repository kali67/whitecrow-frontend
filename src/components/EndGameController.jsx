import React from "react";
import axios from "axios";
import Spinner from "./Spinner";
import EndGameView from "./EndGameView";

export default class EndGameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gameData: null
    };
  }
  componentDidMount() {
    //`/game/${this.props.match.params.id}/end`;
    document.getElementById("root").style = "background: #ffffff;";
    axios.post("http://demo6603334.mockable.io/endgame", {}).then(response => {
      this.setState({ loading: false, gameData: response["data"] });
    });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <EndGameView gameData={this.state.gameData} />;
  }
}
