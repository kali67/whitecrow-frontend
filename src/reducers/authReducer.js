import { AUTHENTICATE, ACCESS_DENIED } from "../actions/types";

const initialState = {
  accessDenied: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        accessDenied: false
      };
    case ACCESS_DENIED:
      return {
        ...state,
        accessDenied: true
      };
    default:
      return state;
  }
}
