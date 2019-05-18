import {
  FETCH_GAME_DETAILS,
  UPDATE_PLAYER_POSITION,
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
  AITurnResults: [],
  gameId: -1
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
    case UPDATE_PLAYER_POSITION:
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
        AITurnResults: action.AITurnResults
      };
    case ROLL_DIE:
      return {
        ...state,
        userTurnResult: action.userTurnResult
      };
    case FINISH_USER_TURN:
      return {
        ...state,
        isLoadingRoll: action.isLoadingRoll,
        AITurnResults: action.AITurnResults,
        playerTurnIndex: action.playerTurnIndex
      };
    case FINISH_AI_TURN:
      return {
        ...state,
        playerTurnIndex: action.playerTurnIndex
      };
    default:
      return state;
  }
}
