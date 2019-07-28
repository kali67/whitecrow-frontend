import { SET_ACTIVE_LANGUAGE } from "./types";

export const setApplicationLanguage = activeLanguage => dispatch => {
  dispatch({
    type: SET_ACTIVE_LANGUAGE,
    activeLanguage: activeLanguage
  });
};
