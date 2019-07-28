import { SET_ACTIVE_LANGUAGE } from "../actions/types";

const initialState = {
  languages: [{ name: "English", code: "EN" }, { name: "Español", code: "ES" }],
  activeLanguage: "EN"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LANGUAGE:
      return {
        ...state,
        activeLanguage: action.activeLanguage
      };
    default:
      return state;
  }
}
