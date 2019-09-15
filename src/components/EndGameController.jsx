import React from "react";
import axios from "axios";
import { SpinnerFullCircle } from "./Spinner";
import EndGameView from "./EndGameView";
import GameBoard from "./GameBoard";
import { connect } from "react-redux";
import { fetchGameDetails, resetLoadingStates } from "../actions/singlePlayerControllerActions";
import { fetchUserPlayer, resetUserLoadingState } from "../actions/userActions";

class EndGameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gameData: null
    };
    console.log(this.props)
  }
  componentDidMount() {
    document.getElementById("root").style = "background: #1c2321;";
    let gameId = this.props.match.params.id;
    this.loadDetails(gameId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.props.loadingGameDetails &&
      !this.props.loadingUserDetails &&
      (prevProps.loadingGameDetails !== this.props.loadingGameDetails ||
        prevProps.loadingUserDetails !== this.props.loadingUserDetails)
    ) {
      this.fetchEndGameDetails();
    }
  }

  componentWillUnmount() {
    this.props.resetLoadingStates();
    this.props.resetUserLoadingState();
    document.getElementById("root").style = "background: #ffffff;";
  }

  fetchEndGameDetails = () => {
    axios
      .post(
        `/game/${this.props.match.params.id}/end`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        }
      )
      .then(response => {
        console.log(response);
        this.setState({ loading: false, gameData: response["data"] });
      });
  };

  loadDetails = gameId => {
    this.props.fetchGameDetails(gameId);
    this.props.fetchUserPlayer(gameId);
  };

  goHome = () => {
    this.props.history.push("/home");
  };

  render() {
    if (this.state.loading) {
      return <SpinnerFullCircle />;
    }
    return (
      <React.Fragment>
        <GameBoard players={this.props.players} />
        <EndGameView
          gameData={this.state.gameData}
          userPlayerId={this.props.userPlayer["id"]}
          goHome={this.goHome}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userPlayer: state.user.player,
  loadingGameDetails: state.game.isLoadingGameDetails,
  loadingUserDetails: state.user.isLoadingUserDetails,
  players: state.game.players
});

export default connect(
  mapStateToProps,
  {
    resetLoadingStates,
    fetchGameDetails,
    fetchUserPlayer,
    resetUserLoadingState
  }
)(EndGameController);
