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
  IS_LOADING_GAME_DETAILS
} from "../actions/types";

const initialState = {
  loading: true,
  userPlayer: null,
  players: [],
  numberRounds: 0,
  playerTurnIndex: 0,
  AITurnResults: [],
  gameId: -1,
  userTurnResult: null,
  isInSetBackState: false,
  isLoadingQueryPlayerTurns: false,
  isLoadingGameDetails: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING_GAME_DETAILS:
      return {
        ...state,
        isLoadingGameDetails: action.isLoadingGameDetails
      };
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
        loading: action.loading,
        isLoadingQueryPlayerTurns: action.isLoadingQueryPlayerTurns
      };
    case UPDATE_PLAYER_TURN_RESULTS:
      return {
        ...state,
        loading: action.loading,
        AITurnResults: action.AITurnResults,
        isLoadingQueryPlayerTurns: false
      };
    case ROLL_DIE:
      return {
        ...state,
        userTurnResult: action.userTurnResult,
        isLoadingQueryPlayerTurns: false
      };
    case FINISH_USER_TURN:
      return {
        ...state,
        AITurnResults: action.AITurnResults,
        playerTurnIndex: action.playerTurnIndex,
        isLoadingQueryPlayerTurns: action.isLoadingQueryPlayerTurns
      };
    case FINISH_AI_TURN:
      return {
        ...state,
        playerTurnIndex: action.playerTurnIndex
      };
    case UPDATE_CURRENT_USER_TURN_RESULT:
      return {
        ...state,
        userTurnResult: action.userTurnResult
      };
    case UPDATE_AI_TURN_RESULTS:
      return {
        ...state,
        AITurnResults: action.aiTurnResults,
        isLoadingQueryPlayerTurns: false
      };
    case SET_SET_BACK_ROTATION_FLAG:
      return {
        ...state,
        isInSetBackState: action.flag
      };
    default:
      return state;
  }
}
