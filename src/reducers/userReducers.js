import {
  FETCH_USER_PLAYER,
  UPDATE_PLAYER_MAIL_CARDS,
  UPDATE_PLAYER_OPPOURTUNITY_CARDS,
  UPDATE_PLAYER_MONEY,
  UPDATE_PLAYER_DAY
} from "../actions/types";

const initialState = {
  player: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
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
      updatedPlayer["opportunity"] = [...state.player["opportunity"], action.card];
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

    default:
      return state;
  }
}
