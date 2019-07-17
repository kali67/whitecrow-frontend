import { SHOW_LOGIN, SHOW_SIGNUP, LOGIN } from "../actions/types";
import axios from "axios";

export const showLogin = () => dispatch => {
  dispatch({
    type: SHOW_LOGIN,
    showLogin: true
  });
};

export const showSignUp = () => dispatch => {
  dispatch({
    type: SHOW_SIGNUP,
    showLogin: false
  });
};

export const login = (username, password) => dispatch => {
  axios
    .post("/authenticate", {
      userName: username,
      password: password
    })
    .then(response => {
      dispatch({
        type: LOGIN,
        token: response.data["jwtToken"]
      });
    });
};
