import { combineReducers } from "redux";
import dashboardReducers from "./dashboardReducers";
import singlePlayerControllerReducers from "./singlePlayerControllerReducers";
import userReducers from "./userReducers";

export default combineReducers({
  dashboard: dashboardReducers,
  game: singlePlayerControllerReducers,
  user: userReducers
});
