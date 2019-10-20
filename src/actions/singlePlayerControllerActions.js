import axios from "axios";
import {
  FETCH_GAME_DETAILS,
  FINISH_AI_TURN,
  FINISH_USER_TURN,
  LOADING,
  ROLL_DIE,
  UPDATE_CURRENT_USER_TURN_RESULT,
  UPDATE_PLAYER_POSITION,
  UPDATE_PLAYER_TURN_RESULTS,
  UPDATE_AI_TURN_RESULTS,
  SET_SET_BACK_ROTATION_FLAG,
  ACCESS_DENIED,
  CLOSE_DASHBOARD,
  IS_LOADING_GAME_DETAILS
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

export const resetLoadingStates = () => dispatch => {
  dispatch({
    type: IS_LOADING_GAME_DETAILS,
    isLoadingGameDetails: true
  });
};

export const fetchGameDetails = gameId => dispatch => {
  dispatch({
    type: IS_LOADING_GAME_DETAILS,
    isLoadingGameDetails: true
  });
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
        gameId: gameId
      });
      dispatch({
        type: IS_LOADING_GAME_DETAILS,
        isLoadingGameDetails: false
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: ACCESS_DENIED
      });
    });
};

const queryPlayerTurns = gameId => {
  return axios.post(
    `/game/single/${gameId}/query_turns`,
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
  dispatch({
    type: LOADING,
    isLoadingQueryPlayerTurns: true
  });
  usePlayerTurn(userPlayerId, gameId)
    .then(response => {
      dispatch({
        type: ROLL_DIE,
        userTurnResult: response.data,
        loading: false
      });
      dispatch({
        type: CLOSE_DASHBOARD,
        isOpen: false
      });
    })
    .catch(error => {
      console.log(error);
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
    dispatch({
      type: LOADING
    });
    queryPlayerTurns(gameId)
      .then(response => {
        dispatch({
          type: FINISH_USER_TURN,
          AITurnResults: response.data,
          playerTurnIndex: currentPlayerTurnIndex,
          isLoadingQueryPlayerTurns: false
        });
      })
      .catch(error => {
        dispatch({
          type: ACCESS_DENIED
        });
      });
  } else {
    dispatch({
      type: FINISH_AI_TURN,
      playerTurnIndex: currentPlayerTurnIndex
    });
  }
};

export const updateCurrentUserTurnResult = userTurnResult => dispatch => {
  dispatch({
    type: UPDATE_CURRENT_USER_TURN_RESULT,
    userTurnResult: userTurnResult
  });
};

export const updatePlayerTurnResult = aiTurnResults => dispatch => {
  dispatch({
    type: UPDATE_AI_TURN_RESULTS,
    aiTurnResults: aiTurnResults
  });
};

export const flagSetBackRotation = flag => dispatch => {
  dispatch({
    type: SET_SET_BACK_ROTATION_FLAG,
    flag: flag
  });
};
