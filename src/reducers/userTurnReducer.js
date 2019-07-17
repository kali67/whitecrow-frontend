import {
  DISMISS_TURN_NOTIFICATION,
  ANIMATE_PLAYER_MOVEMENT,
  STOP_ANIMATING_PLAYER_MOVEMENT,
  SHOW_DRAWN_CARD,
  DISMISS_CARD_MODAL,
  SHOW_DRAWN_OPPOURTUNITY_CARD,
  SHOW_TURN_NOTIFCATION
} from "../actions/types";

const initialState = {
  shouldShowTurnNotificator: true,
  animateMovement: false,
  card: null,
  cardDrawn: false,
  isOpportunityCard: false,
  notificationText: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DISMISS_TURN_NOTIFICATION:
      return {
        ...state,
        shouldShowTurnNotificator: action.shouldShowTurnNotificator
      };

    case ANIMATE_PLAYER_MOVEMENT:
      return {
        ...state,
        animateMovement: true
      };
    case STOP_ANIMATING_PLAYER_MOVEMENT:
      return {
        ...state,
        shouldShowTurnNotificator: false,
        animateMovement: false
      };
    case SHOW_DRAWN_CARD:
      return {
        ...state,
        cardDrawn: true,
        card: action.card
      };
    case DISMISS_CARD_MODAL:
      return {
        ...state,
        cardDrawn: false,
        isOpportunityCard: false
      };
    case SHOW_DRAWN_OPPOURTUNITY_CARD:
      return {
        ...state,
        cardDrawn: true,
        card: action.card,
        isOpportunityCard: true
      };
    case SHOW_TURN_NOTIFCATION:
      return {
        ...state,
        shouldShowTurnNotificator: true,
        notificationText: action.notificationText
      };
    default:
      return state;
  }
}
