import {
  DISMISS_TURN_NOTIFICATION,
  ANIMATE_PLAYER_MOVEMENT,
  STOP_ANIMATING_PLAYER_MOVEMENT,
  SHOW_DRAWN_CARD,
  DISMISS_CARD_MODAL,
  SHOW_DRAWN_OPPOURTUNITY_CARD,
  SHOW_TURN_NOTIFCATION
} from "./types";

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
  console.log("shown card");
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
