import { combineReducers } from "redux";
import dashboardReducers from "./dashboardReducers";
import singlePlayerControllerReducers from "./singlePlayerControllerReducers";
import userReducers from "./userReducers";
import userTurnReducer from "./userTurnReducer";
import loginReducer from "./loginReducer";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import { localizeReducer } from "react-localize-redux";

export default combineReducers({
  dashboard: dashboardReducers,
  game: singlePlayerControllerReducers,
  user: userReducers,
  userTurn: userTurnReducer,
  login: loginReducer,
  routing: routerReducer,
  auth: authReducer,
  localize: localizeReducer
});
