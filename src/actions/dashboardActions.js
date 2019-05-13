import { OPEN_DASHBOARD, CLOSE_DASHBOARD, SHOW_HELPMODAL, CLOSE_HELPMODAL } from "./types";

export const openDashboard = () => dispatch => {
  dispatch({
    type: OPEN_DASHBOARD,
    isOpen: true
  });
};

export const closeDashboard = () => dispatch => {
  dispatch({
    type: CLOSE_DASHBOARD,
    isOpen: false
  });
};

export const showHelpModal = () => dispatch => {
  dispatch({
    type: SHOW_HELPMODAL,
    isOpen: false,
    helpModalIsOpen: true
  });
};

export const closeHelpModal = () => dispatch => {
  dispatch({
    type: CLOSE_HELPMODAL,
    isOpen: true,
    helpModalIsOpen: false
  });
};
