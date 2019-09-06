import { ACCESS_DENIED, AUTHENTICATE } from "./types";

export const authenticate = jwt => dispatch => {
  localStorage.setItem("jwt", jwt);
  dispatch({
    type: AUTHENTICATE
  });
};

export const denyAccess = () => dispatch => {
  dispatch({
    type: ACCESS_DENIED
  });
};
