import {
  DISMISS_TURN_NOTIFICATION,
  ANIMATE_PLAYER_MOVEMENT,
  STOP_ANIMATING_PLAYER_MOVEMENT,
  SHOW_DRAWN_CARD,
  DISMISS_CARD_MODAL,
  SHOW_DRAWN_OPPOURTUNITY_CARD,
  SHOW_TURN_NOTIFCATION, END_TURN,
  FLAG_AS_SET_BACK
} from "./types";
import axios from "axios";

export const dismissTurnNotification = () => dispatch => {
  dispatch({
    type: DISMISS_TURN_NOTIFICATION,
    shouldShowTurnNotificator: false
  });
};

export const animatePlayerMovement = () => dispatch => {
  dispatch({
    type: ANIMATE_PLAYER_MOVEMENT
  });
};

export const stopPlayerTurnAnimation = () => dispatch => {
  dispatch({
    type: STOP_ANIMATING_PLAYER_MOVEMENT
  });
};

export const showDrawnCard = card => dispatch => {
  dispatch({
    type: SHOW_DRAWN_CARD,
    card: card
  });
};

export const dismissCardModal = () => dispatch => {
  dispatch({
    type: DISMISS_CARD_MODAL
  });
};

export const showDrawnOpportunityCard = card => dispatch => {
  dispatch({
    type: SHOW_DRAWN_OPPOURTUNITY_CARD,
    card: card
  });
};

export const showFullScreenNotification = textToDisplay => dispatch => {
  dispatch({
    type: SHOW_TURN_NOTIFCATION,
    notificationText: textToDisplay
  });
};

export const flagAsSetBackTurn = flag => dispatch => {
  dispatch({
    type: FLAG_AS_SET_BACK,
    setbackTurnResult: flag
  });
};

export const endTurn = gameId => dispatch => {
  axios
    .post(
      `/game/${gameId}/end_turn`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      }
    )
    .then(() => {
      dispatch({
        type: END_TURN
      });
    });
};
