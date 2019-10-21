import React from "react";
import GameBoard from "../components/Game/GameBoard";
import { SpinnerFullCircle } from "../components/Animations/Spinner";
import DrawerController from "../components/Dashboard/DrawerController";
import PlayerTurnProgress from "../components/PlayerTurn/PlayerTurnProgress";
import UserPlayerTurn from "../components/PlayerTurn/UserPlayerTurn";

import {
  fetchGameDetails,
  updatePlayerModels,
  startGame,
  finishPlayerTurn,
  rollDie,
  updatePlayerTurnResult,
  flagSetBackRotation,
  resetLoadingStates
} from "../actions/singlePlayerControllerActions";

import { fetchUserPlayer, resetUserLoadingState } from "../actions/userActions";
import { connect } from "react-redux";

class SinglePlayerController extends React.Component {
  /**
   * Upon mounting of the controller, user and game details
   * are fetched from the backend. This method also
   * ensure the background is the correct color.
   */
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

  /**
   * Reset background colour to white once the component
   * lifecycle has ended.
   */
  componentWillUnmount() {
    document.getElementById("root").style = "background: #ffffff;";
  }

  /**
   * Updates the current players position. A current player
   * can be consider the player who is using their turn at this point in
   * time. This method syncs this back to the redux state.
   * @param updatedPosition new position of the current player
   */
  updatePlayersPosition = updatedPosition => {
    let players = this.props.players.slice();
    let updatedPlayer = this.props.players[this.props.playerTurnIndex];
    updatedPlayer["day"] = updatedPosition;
    players[this.props.playerTurnIndex] = updatedPlayer;
    this.props.updatePlayerModels(players);
  };

  /**
   * Users a players turn and is the start of the turn
   * flow for the user.
   */
  rollDie = () => {
    this.props.rollDie(this.props.userPlayer["id"], this.props.gameId);
  };

  /**
   * Finishes the player turn. This means that the player turn index
   * will be updated and if required, AI turn results will be fetched.
   * @param isUserTurn defaults to false, indicates whether system should
   * fetch the AI players turns from the server.
   */
  finishPlayerTurn = (isUserTurn = false) => {
    this.props.finishPlayerTurn(
      isUserTurn,
      this.props.gameId,
      this.props.playerTurnIndex,
      this.props.players
    );
  };

  /**
   * Gets the current AI players turn result, again current means the AI player
   * who is using their turn.
   * @returns turnresult object detailing attribute changes in a single turn
   */
  findPlayerTurnResult = () => {
    let playerNext = this.props.players[this.props.playerTurnIndex];
    return this.props.AITurnResults.filter(value => value["playerId"] === playerNext["id"])[0];
  };

  /**
   * Used to keep the players turn but just animate a nested turn result i.e. set back
   * with multiple 'turns' per turn.
   * @param playerTurnResult parent turn result of the player
   */
  updatePlayerTurnResult = playerTurnResult => {
    let currentPlayer = this.props.players[this.props.playerTurnIndex];
    let newAITurnResults = this.props.AITurnResults.map(x => {
      if (x["playerId"] === currentPlayer["id"]) {
        return playerTurnResult;
      }
      return x;
    });
    this.props.updatePlayerTurnResult(newAITurnResults);
  };

  /**
   * Helper method to indicate if the current turn is the
   * users turn.
   * @returns true is the current turn is the users turn
   */
  isUsersTurn = () => {
    let currentPlayerId = this.props.players[this.props.playerTurnIndex]["id"];
    return currentPlayerId === this.props.userPlayer["id"];
  };

  /**
   * Updates player model state in redux
   */
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

  redirectToEndGameScreen = () => {
    this.props.history.push({
      pathname: `/game/${this.props.gameId}/end`
    });
  };

  flagSetBackRotation = flag => {
    this.props.flagSetBackRotation(flag);
  };

  render() {
    if (
      this.props.loadingGameDetails ||
      this.props.loadingUserDetails ||
      this.props.loadingStartGame
    ) {
      return <SpinnerFullCircle />;
    } else if (this.hasGameEnded()) {
      this.redirectToEndGameScreen();
    }
    return (
      <div style={{ display: "flex" }}>
        <DrawerController gameId={this.props.match.params.id} rollDie={this.rollDie} />
        <GameBoard players={this.props.players} />
        {this.isUsersTurn() && (
          <UserPlayerTurn
            finishPlayerTurn={this.finishPlayerTurn}
            updatePlayersPosition={this.updatePlayersPosition}
            updatePlayerState={this.updatePlayerState}
            flagSetBackRotation={this.flagSetBackRotation}
          />
        )}
        {!this.isUsersTurn() && !this.props.isLoadingQueryPlayerTurns && (
          <PlayerTurnProgress
            finishPlayerTurn={this.finishPlayerTurn}
            player={this.props.players[this.props.playerTurnIndex]}
            finalPlayerState={this.findPlayerTurnResult()}
            updatePlayersPosition={this.updatePlayersPosition}
            updatePlayerState={this.updatePlayerState}
            updatePlayerTurnResult={this.updatePlayerTurnResult}
            flagSetBackRotation={this.flagSetBackRotation}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ game, user }) => ({
  isLoadingQueryPlayerTurns: game.isLoadingQueryPlayerTurns,
  loadingStartGame: game.loading,
  loadingGameDetails: game.isLoadingGameDetails,
  loadingUserDetails: user.isLoadingUserDetails,
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
    updatePlayerTurnResult,
    flagSetBackRotation,
    resetLoadingStates,
    resetUserLoadingState
  }
)(SinglePlayerController);
