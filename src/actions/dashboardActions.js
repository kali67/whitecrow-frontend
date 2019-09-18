import { OPEN_DASHBOARD, CLOSE_DASHBOARD } from "./types";

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
