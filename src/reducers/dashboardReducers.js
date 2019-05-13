import {
  OPEN_DASHBOARD,
  CLOSE_DASHBOARD,
  SHOW_HELPMODAL,
  CLOSE_HELPMODAL,
  FETCH_USER_PLAYER
} from "../actions/types";

const initialState = {
  isOpen: false,
  isLoadingRoll: false,
  loadingFetch: true,
  helpModalIsOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_DASHBOARD:
    case CLOSE_DASHBOARD:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case SHOW_HELPMODAL:
    case CLOSE_HELPMODAL:
      return {
        ...state,
        isOpen: action.isOpen,
        helpModalIsOpen: action.helpModalIsOpen
      };
    default:
      return state;
  }
}
