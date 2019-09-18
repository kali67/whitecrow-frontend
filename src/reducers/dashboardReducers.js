import { OPEN_DASHBOARD, CLOSE_DASHBOARD } from "../actions/types";

const initialState = {
  isOpen: false,
  isLoadingRoll: false,
  loadingFetch: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_DASHBOARD:
    case CLOSE_DASHBOARD:
      return {
        ...state,
        isOpen: action.isOpen
      };
    default:
      return state;
  }
}
