import React from "react";
import axios from "axios";
import GameBoard from "../components/GameBoard";
import Spinner from "../components/Spinner";
import DrawerController from "../components/DrawerController";
import PlayerTurnProgress, {
  SinglePlayerTurn
} from "../components/PlayerTurnProgress";

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
      staticPlayers: [],
      playerTurnResults: [],
      userPlayerId: 0,
      singlePlayerTurnResult: null
    };
  }

  componentDidMount() {
    document.getElementById("root").style = "background: #1c2321;";
    let id = this.props.match.params.id;
    axios.get(`/game/details/${id}`).then(response => {
      console.log(response.data);
      let mappedPlayers = response.data["players"]
        .map(el => {
          return {
            day: el.day,
            id: el.id,
            username: el.username,
            order: el.order
          };
        })
        .sort(compare);

      this.setState(
        {
          players: mappedPlayers,
          numberRounds: response.data["numberRounds"],
          playerTurnIndex: response.data["next"].order,
          staticPlayers: mappedPlayers,
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
    this.queryPlayerMovements();
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
      this.queryPlayerMovements();
    }
    this.setState({
      playerTurnIndex:
        (this.state.playerTurnIndex + 1) % this.state.staticPlayers.length
    });
  };

  notifySinglePlayersTurn = () => {
    this.setState({ isSinglePlayersTurn: true });
  };

  queryPlayerMovements = () => {
    let id = this.props.match.params.id;
    this.setState({ isLoadingRoll: true });
    axios
      .post(
        `/game/single/${id}/start`,
        {},
        {
          auth: {
            username: "hta55",
            password: "welcome1"
          }
        }
      )
      .then(response => {
        this.setState({
          isLoadingRoll: false,
          isOpen: false,
          playerTurnResults: response.data
        });
      });
  };

  findPlayerTurnResult = () => {
    let playerNext = this.state.staticPlayers[this.state.playerTurnIndex];
    let results = this.state.playerTurnResults.filter(value => {
      if (value["playerId"] == playerNext["id"]) return value;
    })[0];
    return results;
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div style={{ display: "flex" }}>
        <PlayerContext.Provider
          value={{
            players: this.state.players,
            playerTurnIndex: this.state.playerTurnIndex,
            isSinglePlayersTurn:
              this.state.staticPlayers[this.state.playerTurnIndex]["id"] ==
              this.state.userPlayerId
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
        {this.state.staticPlayers[this.state.playerTurnIndex]["id"] ==
        this.state.userPlayerId ? (
          <SinglePlayerTurn
            finishPlayerTurn={this.finishPlayerTurn}
            updatePlayers={this.updatePlayers}
            singlePlayerTurnResult={this.state.singlePlayerTurnResult}
            player={this.state.staticPlayers[this.state.playerTurnIndex]}
          />
        ) : (
          <PlayerTurnProgress
            userPlayerId={this.state.userPlayerId}
            finishPlayerTurn={this.finishPlayerTurn}
            player={this.state.staticPlayers[this.state.playerTurnIndex]}
            finalPlayerState={this.findPlayerTurnResult()}
            updatePlayers={this.updatePlayers}
          />
        )}
      </div>
    );
  }
}
