import { AUTHENTICATE } from "../actions/types";

const initialState = {
  jwt: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        jwt: action.jwt
      };
    default:
      return state;
  }
}
