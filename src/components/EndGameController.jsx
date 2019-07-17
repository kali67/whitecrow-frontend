import React from "react";
import axios from "axios";
import Spinner from "./Spinner";
import EndGameView from "./EndGameView";
import GameBoard from "./GameBoard";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class EndGameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gameData: null,
      shouldRedirectHome: false
    };
  }
  componentDidMount() {
    axios
      .post(
        `/game/${this.props.gameId}/end`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        }
      )
      .then(response => {
        this.setState({ loading: false, gameData: response["data"] });
      });
  }
  goHome = () => {
    this.setState({ shouldRedirectHome: true });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    if (this.state.shouldRedirectHome) {
      return <Redirect to={"/home"} />;
    }
    return (
      <React.Fragment>
        <GameBoard players={this.props.players} />
        <EndGameView
          gameData={this.state.gameData}
          userPlayerId={this.props.userPlayerId}
          goHome={this.goHome}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userPlayerId: state.user.player["id"]
});

export default connect(
  mapStateToProps,
  {}
)(EndGameController);
