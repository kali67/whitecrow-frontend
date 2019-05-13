import {
  FETCH_GAME_DETAILS,
  UPDATE_PLAYERS,
  LOADING,
  UPDATE_PLAYER_TURN_RESULTS,
  ROLL_DIE,
  FINISH_USER_TURN,
  FINISH_AI_TURN
} from "../actions/types";

const initialState = {
  loading: true,
  userPlayer: null,
  players: [],
  numberRounds: 0,
  playerTurnIndex: 0,
  playerTurnResults: [],
  gameId: -1,
  gameHasEnded: false,
  showEndTurnUpdate: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAME_DETAILS:
      return {
        ...state,
        userPlayer: action.userPlayer,
        players: action.players,
        numberRounds: action.numberRounds,
        playerTurnIndex: action.playerTurnIndex,
        loading: action.loading,
        gameId: action.gameId
      };
    case UPDATE_PLAYERS:
      return {
        ...state,
        players: action.players
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case UPDATE_PLAYER_TURN_RESULTS:
      return {
        ...state,
        loading: action.loading,
        playerTurnResults: action.playerTurnResults
      };
    case ROLL_DIE:
      return {
        ...state,
        singlePlayerTurnResult: action.singlePlayerTurnResult,
        showEndTurnUpdate: action.showEndTurnUpdate
      };
    case FINISH_USER_TURN:
      return {
        ...state,
        isLoadingRoll: action.isLoadingRoll,
        playerTurnResults: action.playerTurnResults,
        playerTurnIndex: action.playerTurnIndex,
        showEndTurnUpdate: action.showEndTurnUpdate
      };
    case FINISH_AI_TURN:
      return {
        ...state,
        playerTurnIndex: action.playerTurnIndex,
        showEndTurnUpdate: action.showEndTurnUpdate
      };
    default:
      return state;
  }
}
