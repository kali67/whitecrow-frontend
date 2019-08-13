import React from "react";
import GameBoard from "../components/GameBoard";
import { SpinnerFullCircle } from "../components/Spinner";
import DrawerController from "../components/DrawerController";
import PlayerTurnProgress from "../components/PlayerTurnProgress";
import UserPlayerTurn from "../components/UserPlayerTurn";

import {
  fetchGameDetails,
  updatePlayerModels,
  startGame,
  finishPlayerTurn,
  rollDie,
  updatePlayerTurnResult
} from "../actions/singlePlayerControllerActions";

import { fetchUserPlayer } from "../actions/userActions";

import { connect } from "react-redux";
import EndGameController from "../components/EndGameController";

class SinglePlayerController extends React.Component {
  componentDidMount() {
    document.getElementById("root").style = "background: #1c2321;";
    this.props.fetchGameDetails(this.props.match.params.id);
    this.props.fetchUserPlayer(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameId !== this.props.gameId) {
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
    this.props.finishPlayerTurn(
      isUserTurn,
      this.props.gameId,
      this.props.playerTurnIndex,
      this.props.players
    );
  };

  findPlayerTurnResult = () => {
    let playerNext = this.props.players[this.props.playerTurnIndex];
    console.log(this.props.AITurnResults);
    return this.props.AITurnResults.filter(value => value["playerId"] === playerNext["id"])[0];
  };

  // Used to keep the players turn but just animate a nested turn result i.e. set back
  updatePlayerTurnResult = playerTurnResult => {
    let currentPlayer = this.props.players[this.props.playerTurnIndex];
    let newAITurnResults = this.props.AITurnResults.map(x => {
      if (x["playerId"] === currentPlayer["id"]) {
        return playerTurnResult;
      }
      return x;
    });
    this.props.updatePlayerTurnResult(newAITurnResults)
  };

  isUsersTurn = () => {
    let currentPlayerId = this.props.players[this.props.playerTurnIndex]["id"];
    return currentPlayerId === this.props.userPlayer["id"];
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
      return <SpinnerFullCircle />;
    }
    if (this.hasGameEnded()) {
      return (
        <EndGameController
          gameId={this.props.gameId}
          players={this.props.players}
        />
      );
    }
    return (
      <div style={{ display: "flex" }}>
        <DrawerController
          gameId={this.props.match.params.id}
          rollDie={this.rollDie}
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
            updatePlayerTurnResult={this.updatePlayerTurnResult}
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
    fetchUserPlayer,
    updatePlayerTurnResult
  }
)(SinglePlayerController);
