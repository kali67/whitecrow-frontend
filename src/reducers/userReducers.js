import {
  FETCH_USER_PLAYER,
  UPDATE_PLAYER_MAIL_CARDS,
  UPDATE_PLAYER_OPPOURTUNITY_CARDS,
  UPDATE_PLAYER_MONEY,
  UPDATE_PLAYER_DAY,
  IS_LOADING_USER_DETAILS,
  SET_ACCOUNT_DETAILS
} from "../actions/types";

const initialState = {
  player: null,
  loading: true,
  isLoadingUserDetails: true,
  hasCompletedPreTest: false,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING_USER_DETAILS:
      return {
        ...state,
        isLoadingUserDetails: action.isLoadingUserDetails
      };
    case FETCH_USER_PLAYER:
      return {
        ...state,
        player: action.player,
        loading: false
      };
    case UPDATE_PLAYER_MAIL_CARDS:
      let newPlayer = Object.assign({}, state.player);
      newPlayer["mail"] = [...state.player["mail"], action.card];
      return {
        ...state,
        player: newPlayer
      };
    case UPDATE_PLAYER_OPPOURTUNITY_CARDS:
      let updatedPlayer = Object.assign({}, state.player);
      updatedPlayer["opportunity"] = [
        ...state.player["opportunity"],
        action.card
      ];
      return {
        ...state,
        player: updatedPlayer
      };
    case UPDATE_PLAYER_MONEY:
      let player = Object.assign({}, state.player);
      player["money"] += action.money;
      return {
        ...state,
        player: player
      };
    case UPDATE_PLAYER_DAY:
      let playerUpdatedDay = Object.assign({}, state.player);
      playerUpdatedDay["day"] = action.day;
      return {
        ...state,
        player: playerUpdatedDay
      };
    case SET_ACCOUNT_DETAILS:
      return {
        ...state,
        id: action.id,
        hasCompletedPreTest: action.hasCompletedPreTest
      };
    default:
      return state;
  }
}
