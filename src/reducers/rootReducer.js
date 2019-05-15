import {combineReducers} from "redux";
import dashboardReducers from "./dashboardReducers";
import singlePlayerControllerReducers from "./singlePlayerControllerReducers";
import userReducers from "./userReducers";
import userTurnReducer from "./userTurnReducer"

export default combineReducers({
    dashboard: dashboardReducers,
    game: singlePlayerControllerReducers,
    user: userReducers,
    userTurn: userTurnReducer
});
