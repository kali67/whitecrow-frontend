import { SHOW_LOGIN, SHOW_SIGNUP } from "../actions/types";

const initialState = {
  showLogin: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN:
      return {
        ...state,
        showLogin: action.showLogin
      };
    case SHOW_SIGNUP:
      return {
        ...state,
        showLogin: action.showLogin
      };
    default:
      return state;
  }
}
