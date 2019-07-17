import { AUTHENTICATE } from "./types";

export const authenticate = jwt => dispatch => {
  localStorage.setItem("jwt", jwt);
  dispatch({
    type: AUTHENTICATE,
    jwt: jwt
  });
};
