import React from "react";
import GameBoard from "../components/GameBoard";
import Spinner from "../components/Spinner";
import DrawerController from "../components/DrawerController";
import PlayerTurnProgress from "../components/PlayerTurnProgress";
import UserPlayerTurn from "../components/UserPlayerTurn";
import { Redirect } from "react-router";

import {
  fetchGameDetails,
  updatePlayerModels,
  startGame,
  finishPlayerTurn,
  rollDie
} from "../actions/singlePlayerControllerActions";

import { fetchUserPlayer } from "../actions/userActions";

import { connect } from "react-redux";

class SinglePlayerController extends React.Component {
  componentDidMount() {
    document.getElementById("root").style = "background: #1c2321;";
    this.props.fetchGameDetails(this.props.match.params.id);
    this.props.fetchUserPlayer(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameId != this.props.gameId) {
      this.props.startGame(this.props.gameId);
    }
  }

  updatePlayersPosition = updatedPosition => {
    let players = this.props.players.slice();
    let updatedPlayer = this.props.players[this.props.playerTurnIndex];
    updatedPlayer["day"] = updatedPosition;
    players[this.props.playerTurnIndex] = updatedPlayer;
    this.props.updatePlayerModels(players);
  };

  rollDie = () => {
    this.props.rollDie(this.props.userPlayer["id"], this.props.gameId);
  };

  finishPlayerTurn = (isUserTurn = false) => {
    console.log("finished turn");
    this.props.finishPlayerTurn(
      isUserTurn,
      this.props.gameId,
      this.props.playerTurnIndex,
      this.props.players
    );
  };

  findPlayerTurnResult = () => {
    let playerNext = this.props.players[this.props.playerTurnIndex];
    return this.props.AITurnResults.filter(value => {
      if (value["playerId"] == playerNext["id"]) return value;
    })[0];
  };

  isUsersTurn = () => {
    let currentPlayerId = this.props.players[this.props.playerTurnIndex]["id"];
    return currentPlayerId == this.props.userPlayer["id"];
  };

  updatePlayerState = player => {
    let players = this.props.players.slice();
    players[this.props.playerTurnIndex] = player;
    this.props.updatePlayerModels(players);
  };

  hasGameEnded = () => {
    return this.props.players.every(player => {
      return player["hasFinishedGame"];
    });
  };

  render() {
    if (this.props.loadingGameDetails || this.props.loadingUserDetails) {
      return <Spinner />;
    }
    if (this.hasGameEnded()) {
      return <Redirect to={`/game/${this.props.gameId}/end`} />;
    }
    return (
      <div style={{ display: "flex" }}>
        <DrawerController
          gameId={this.props.match.params.id}
          rollDie={this.rollDie}
          updatePlayerPositions={this.updatePlayerPositions}
        />
        <GameBoard players={this.props.players} />
        {this.isUsersTurn() && (
          <UserPlayerTurn
            finishPlayerTurn={this.finishPlayerTurn}
            updatePlayersPosition={this.updatePlayersPosition}
            updatePlayerState={this.updatePlayerState}
          />
        )}
        {!this.isUsersTurn() && !this.props.isLoadingRoll && (
          <PlayerTurnProgress
            finishPlayerTurn={this.finishPlayerTurn}
            player={this.props.players[this.props.playerTurnIndex]}
            finalPlayerState={this.findPlayerTurnResult()}
            updatePlayersPosition={this.updatePlayersPosition}
            updatePlayerState={this.updatePlayerState}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ game, user }) => ({
  loadingGameDetails: game.loading,
  loadingUserDetails: user.loading,
  userPlayer: user.player,
  players: game.players,
  numberRounds: game.numberRounds,
  playerTurnIndex: game.playerTurnIndex,
  AITurnResults: game.AITurnResults,
  gameId: game.gameId,
  showEndTurnUpdate: game.showEndTurnUpdate,
  userTurnResult: game.userTurnResult
});

export default connect(
  mapStateToProps,
  {
    fetchGameDetails,
    updatePlayerModels,
    startGame,
    finishPlayerTurn,
    rollDie,
    fetchUserPlayer
  }
)(SinglePlayerController);
