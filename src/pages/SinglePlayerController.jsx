import React from "react";
import axios from "axios";
import GameBoard from "../components/GameBoard";
import Spinner from "../components/Spinner";
import DrawerController from "../components/DrawerController";
import PlayerTurnProgress from "../components/PlayerTurnProgress";
import UserPlayerTurn from "../components/UserPlayerTurn";
import { Redirect } from "react-router";

export const PlayerContext = React.createContext([]);

const compare = (a, b) => {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
};

export default class SinglePlayerController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      numberRounds: 0,
      loading: true,
      playerTurnIndex: 0,
      playerTurnResults: [],
      userPlayerId: 0,
      gameHasEnded: false
    };
  }

  componentDidMount() {
    document.getElementById("root").style = "background: #1c2321;";
    let id = this.props.match.params.id;
    axios.get(`/game/details/${id}`).then(response => {
      let mappedPlayers = response.data["players"];
      mappedPlayers.sort(compare);
      this.setState(
        {
          players: mappedPlayers,
          numberRounds: response.data["numberRounds"],
          playerTurnIndex: response.data["next"].order,
          loading: false
        },
        () => {
          this.start();
        }
      );
    });
  }

  setUserPlayerID = id => {
    this.setState({ userPlayerId: id });
  };

  updatePlayers = updatedPosition => {
    let players = this.state.players.slice();
    let updatedPlayer = this.state.players[this.state.playerTurnIndex];
    updatedPlayer["day"] = updatedPosition;
    players[this.state.playerTurnIndex] = updatedPlayer;
    this.setState({ players: players });
  };

  start = () => {
    this.queryPlayerMovements().then(response => {
      this.setState({
        isLoadingRoll: false,
        isOpen: false,
        playerTurnResults: response.data
      });
    });
  };

  rollDie = () => {
    let id = this.props.match.params.id;
    axios
      .post(
        `player/${this.state.userPlayerId}/game/${id}/roll`,
        {},
        {
          auth: {
            username: "hta55",
            password: "welcome1"
          }
        }
      )
      .then(response => {
        this.setState({ singlePlayerTurnResult: response.data });
      });
  };

  finishPlayerTurn = (isUserTurn = false) => {
    if (isUserTurn) {
      this.queryPlayerMovements().then(response => {
        this.setState({
          isLoadingRoll: false,
          isOpen: false,
          playerTurnResults: response.data,
          playerTurnIndex: (this.state.playerTurnIndex + 1) % this.state.players.length
        });
      });
    } else {
      this.setState({
        playerTurnIndex: (this.state.playerTurnIndex + 1) % this.state.players.length
      });
    }
  };

  queryPlayerMovements = () => {
    let id = this.props.match.params.id;
    this.setState({ isLoadingRoll: true });
    return axios.post(
      `/game/single/${id}/start`,
      {},
      {
        auth: {
          username: "hta55",
          password: "welcome1"
        }
      }
    );
  };

  findPlayerTurnResult = () => {
    let playerNext = this.state.players[this.state.playerTurnIndex];
    return this.state.playerTurnResults.filter(value => {
      if (value["playerId"] == playerNext["id"]) return value;
    })[0];
  };

  endGame = () => {
    this.setState({ gameHasEnded: true });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    if (this.state.gameHasEnded) {
      return <Redirect to={`/game/${this.props.match.params.id}/end`} />;
    }
    let currentPlayerId = this.state.players[this.state.playerTurnIndex]["id"];
    let isSinglePlayerTurn = currentPlayerId == this.state.userPlayerId;
    return (
      <div style={{ display: "flex" }}>
        <PlayerContext.Provider
          value={{
            players: this.state.players,
            playerTurnIndex: this.state.playerTurnIndex,
            isSinglePlayersTurn: isSinglePlayerTurn
          }}>
          <DrawerController
            {...this.props}
            gameId={this.props.match.params.id}
            setUserPlayerID={this.setUserPlayerID}
            rollDie={this.rollDie}
            updatePlayerPositions={this.updatePlayerPositions}
          />
          <GameBoard
            {...this.props}
            players={this.state.players}
            numberRounds={this.state.numberRounds}
          />
        </PlayerContext.Provider>
        {isSinglePlayerTurn && (
          <UserPlayerTurn
            finishPlayerTurn={this.finishPlayerTurn}
            updatePlayers={this.updatePlayers}
            singlePlayerTurnResult={this.state.singlePlayerTurnResult}
            player={this.state.players[this.state.playerTurnIndex]}
            endGame={this.endGame}
          />
        )}
        {!isSinglePlayerTurn && !this.state.isLoadingRoll && (
          <PlayerTurnProgress
            userPlayerId={this.state.userPlayerId}
            finishPlayerTurn={this.finishPlayerTurn}
            player={this.state.players[this.state.playerTurnIndex]}
            finalPlayerState={this.findPlayerTurnResult()}
            updatePlayers={this.updatePlayers}
            endGame={this.endGame}
          />
        )}
      </div>
    );
  }
}
