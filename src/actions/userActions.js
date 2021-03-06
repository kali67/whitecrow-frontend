import {
  FETCH_USER_PLAYER,
  UPDATE_PLAYER_MAIL_CARDS,
  UPDATE_PLAYER_OPPOURTUNITY_CARDS,
  UPDATE_PLAYER_DAY,
  UPDATE_PLAYER_MONEY,
  ACCESS_DENIED,
  IS_LOADING_USER_DETAILS,
  SET_ACCOUNT_DETAILS
} from "./types";

import axios from "axios";

export const resetUserLoadingState = () => dispatch => {
  dispatch({
    type: IS_LOADING_USER_DETAILS,
    isLoadingUserDetails: true
  });
};

export const fetchUserPlayer = gameId => dispatch => {
  dispatch({
    type: IS_LOADING_USER_DETAILS,
    isLoadingUserDetails: true
  });
  axios
    .get(`/game/${gameId}/player`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(response => {
      dispatch({
        type: FETCH_USER_PLAYER,
        player: {
          id: response.data["id"],
          mail: response.data["mailCards"],
          opportunity: response.data["opportunityCards"],
          day: response.data["day"],
          money: response.data["money"],
          username: response.data["username"],
          hasFinishedGame: response.data["hasFinishedGame"]
        }
      });
      dispatch({
        type: IS_LOADING_USER_DETAILS,
        isLoadingUserDetails: false
      });
    })
    .catch(() => {
      dispatch({
        type: ACCESS_DENIED
      });
    });
};

export const updatePlayerCards = card => dispatch => {
  if (card["cardType"] === "MAIL") {
    dispatch({
      type: UPDATE_PLAYER_MAIL_CARDS,
      card: card
    });
  } else {
    dispatch({
      type: UPDATE_PLAYER_OPPOURTUNITY_CARDS,
      card: card
    });
  }
};

export const updatePlayerMoney = money => dispatch => {
  dispatch({
    type: UPDATE_PLAYER_MONEY,
    money: money
  });
};

export const updatePlayerDay = day => dispatch => {
  dispatch({
    type: UPDATE_PLAYER_DAY,
    day: day
  });
};

export const setAccountDetails = details => dispatch => {
  dispatch({
    type: SET_ACCOUNT_DETAILS,
    hasCompletedPreTest: details["hasCompletedPreTest"],
    id: details["id"]
  });
};

export const updateHasTakenPreTest = id => dispatch => {
  axios.put(
    "/user",
    {
      id: id,
      hasCompletedPreTest: true
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }
  );
  dispatch({
    type: SET_ACCOUNT_DETAILS,
    hasCompletedPreTest: true
  });
};
