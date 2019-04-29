import React from "react";
import axios from "axios";
import GameBoard from "../components/GameBoard";
import Spinner from "../components/Spinner";
import DrawerController from "../components/DrawerController";
import styled from "styled-components";
import Modal from "react-modal";

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
export default class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      players: [],
      numberRounds: 0,
      playerTurnIndex: 0,
      playerTurnObj: null,
      dieHasRolled: false
    };
  }

  componentDidMount() {
    document.getElementById("root").style = "background: #1c2321;";
    const {
      match: { params }
    } = this.props;
    axios.get(`/game/details/${params.id}`).then(response => {
      let mappedPlayers = response.data["players"]
        .map(el => {
          return {
            day: el.day,
            id: el.id,
            username: `Player ${el.id}`,
            order: el.order
          };
        })
        .sort(compare);
      this.setState({
        players: mappedPlayers,
        numberRounds: response.data["numberRounds"],
        playerTurnIndex: 0, //todo,
        playerTurnObj: mappedPlayers[0],
        loading: false
      });
    });
  }

  rollDie = () => {
    this.setState({ hasShownPlayerStart: false, showPlayerStart: true });
    setTimeout(() => {
      this.setState({ showPlayerStart: false });
      this.updatePlayerPositionsInitial();
    }, 3000);
  };

  setTimer2 = (data, index) => {
    this.setState({ hasShownPlayerStart: false, showPlayerStart: true });
    setTimeout(() => {
      this.setState(
        { hasShownPlayerStart: true, showPlayerStart: false },
        () => {
          this.updatePlayerPositions(data, index);
        }
      );
    }, 3000);
  };

  updatePlayerPositionsInitial = () => {
    this.setState({ isLoadingRoll: true });
    axios
      .post(
        "/game/single/1/start",
        {},
        {
          auth: {
            username: "hta55",
            password: "welcome1"
          }
        }
      )
      .then(response => {
        this.setState({ isLoadingRoll: false, isOpen: false });
        this.updatePlayerPositions(response.data, 0);
      });
  };

  updatePlayerPositions = (data, index = null) => {
    if (index < data.length) {
      let statePlayers = this.state.players.slice();
      let player = statePlayers.filter(el => {
        if (el.id === data[index]["playerId"]) return el;
      })[0];
      let stateIndex = statePlayers.indexOf(player);
      if (data[index]["currentDay"] > player["day"]) {
        statePlayers[stateIndex] = {
          id: player.id,
          day: player["day"] + 1,
          username: `Player ${player.id}`,
          order: player["order"]
        };
        this.setState({ players: statePlayers }, () => {
          setTimeout(() => {
            this.updatePlayerPositions(data, index);
          }, 1000);
        });
      } else {
        this.setState(
          {
            playerTurnIndex: this.state.playerTurnIndex + 1,
            playerTurnObj: this.state.players[this.state.playerTurnIndex + 1]
          },
          () => {
            index++;
            setTimeout(() => {
              this.setTimer2(data, index);
            }, 1000);
          }
        );
      }
    }
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
            playerTurnIndex: this.state.playerTurnIndex
          }}>
          <DrawerController
            {...this.props}
            rollDie={this.rollDie}
            updatePlayerPositions={this.updatePlayerPositions}
          />
          <GameBoard
            {...this.props}
            players={this.state.players}
            numberRounds={this.state.numberRounds}
          />
        </PlayerContext.Provider>
        <Modal
          isOpen={this.state.showPlayerStart}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}>
          <ModalBody>
            <ModalText>
              {this.state.playerTurnObj.username.toUpperCase()}
            </ModalText>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const customStyles = {
  content: {
    height: "65%",
    width: "65vw",
    top: "50%",
    left: "52%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: "0px",
    overflow: "hidden"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.9)"
  }
};

const ModalText = styled.h1`
  font-size: 80px;
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
`;

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
