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
  rollDie,
  endGame
} from "../actions/singlePlayerControllerActions";

import { fetchUserPlayer } from "../actions/userActions";

import { connect } from "react-redux";

export const PlayerContext = React.createContext([]);

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

  updatePlayers = updatedPosition => {
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
    return this.props.playerTurnResults.filter(value => {
      if (value["playerId"] == playerNext["id"]) return value;
    })[0];
  };

  endGame = () => {
    this.props.endGame();
  };

  render() {
    if (this.props.loadingGameDetails || this.props.loadingUserDetails) {
      return <Spinner />;
    } else if (this.props.gameHasEnded) {
      return <Redirect to={`/game/${this.props.match.params.id}/end`} />;
    } else {
      let currentPlayerId = this.props.players[this.props.playerTurnIndex]["id"];
      let isSinglePlayerTurn = currentPlayerId == this.props.userPlayer["id"];
      return (
        <div style={{ display: "flex" }}>
          <PlayerContext.Provider
            value={{
              players: this.props.players,
              playerTurnIndex: this.props.playerTurnIndex,
              isSinglePlayersTurn: isSinglePlayerTurn,
              usersPlayerUpdated: this.props.singlePlayerTurnResult,
              showEndTurnUpdate: this.props.showEndTurnUpdate
            }}>
            <DrawerController
              {...this.props}
              gameId={this.props.match.params.id}
              rollDie={this.rollDie}
              updatePlayerPositions={this.updatePlayerPositions}
            />
            <GameBoard
              {...this.props}
              players={this.props.players}
              numberRounds={this.props.numberRounds}
            />
          </PlayerContext.Provider>
          {isSinglePlayerTurn && (
            <UserPlayerTurn
              finishPlayerTurn={this.finishPlayerTurn}
              updatePlayers={this.updatePlayers}
              singlePlayerTurnResult={this.props.singlePlayerTurnResult}
              player={this.props.players[this.props.playerTurnIndex]}
              endGame={this.endGame}
            />
          )}
          {!isSinglePlayerTurn && !this.props.isLoadingRoll && (
            <PlayerTurnProgress
              finishPlayerTurn={this.finishPlayerTurn}
              player={this.props.players[this.props.playerTurnIndex]}
              finalPlayerState={this.findPlayerTurnResult()}
              updatePlayers={this.updatePlayers}
              endGame={this.endGame}
            />
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loadingGameDetails: state.game.loading,
  loadingUserDetails: state.user.loading,
  userPlayer: state.user.player,
  players: state.game.players,
  numberRounds: state.game.numberRounds,
  playerTurnIndex: state.game.playerTurnIndex,
  playerTurnResults: state.game.playerTurnResults,
  gameId: state.game.gameId,
  gameHasEnded: state.game.gameHasEnded,
  showEndTurnUpdate: state.game.showEndTurnUpdate,
  singlePlayerTurnResult: state.game.singlePlayerTurnResult
});

export default connect(
  mapStateToProps,
  {
    fetchGameDetails,
    updatePlayerModels,
    startGame,
    finishPlayerTurn,
    rollDie,
    endGame,
    fetchUserPlayer
  }
)(SinglePlayerController);
