import axios from "axios";
import {
  FETCH_GAME_DETAILS,
  UPDATE_PLAYER_POSITION,
  LOADING,
  UPDATE_PLAYER_TURN_RESULTS,
  ROLL_DIE,
  FINISH_USER_TURN,
  FINISH_AI_TURN
} from "./types";

const compare = (a, b) => {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
};

export const fetchGameDetails = gameId => dispatch => {
  axios
    .get(`/game/details/${gameId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(gameResponse => {
      let mappedPlayers = gameResponse.data["players"];
      mappedPlayers.sort(compare);
      dispatch({
        type: FETCH_GAME_DETAILS,
        players: mappedPlayers,
        numberRounds: gameResponse.data["numberRounds"],
        playerTurnIndex: gameResponse.data["next"]["order"],
        loading: false,
        gameId: gameId
      });
    });
};

const queryPlayerTurns = gameId => {
  return axios.post(
    `/game/single/${gameId}/start`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }
  );
};

export const startGame = gameId => dispatch => {
  dispatch({
    type: LOADING,
    loading: true
  });
  queryPlayerTurns(gameId).then(response => {
    dispatch({
      type: UPDATE_PLAYER_TURN_RESULTS,
      AITurnResults: response.data,
      loading: false
    });
  });
};

export const updatePlayerModels = players => dispatch => {
  dispatch({
    type: UPDATE_PLAYER_POSITION,
    players: players
  });
};

const usePlayerTurn = (playerId, gameId) => {
  return axios.post(
    `player/${playerId}/game/${gameId}/roll`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }
  );
};

export const rollDie = (userPlayerId, gameId) => dispatch => {
  usePlayerTurn(userPlayerId, gameId).then(response => {
    dispatch({
      type: ROLL_DIE,
      userTurnResult: response.data,
      loading: false
    });
  });
};

export const finishPlayerTurn = (
  isUserTurn = false,
  gameId,
  playerTurnIndex,
  players
) => dispatch => {
  let currentPlayerTurnIndex = (playerTurnIndex + 1) % players.length;
  if (isUserTurn) {
    queryPlayerTurns(gameId)
      .then(response => {
        dispatch({
          type: FINISH_USER_TURN,
          AITurnResults: response.data,
          playerTurnIndex: currentPlayerTurnIndex
        });
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    dispatch({
      type: FINISH_AI_TURN,
      playerTurnIndex: currentPlayerTurnIndex
    });
  }
};
