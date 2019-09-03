import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import competitionReducer from "./competitionReducer";
import roundReducer from "./roundReducer";
import accountReducer from "./accountReducer";
import stravaReducer from "./stravaReducer";
import leaderboardReducer from "./leaderboardReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    competition: competitionReducer,
    round: roundReducer,
    user: accountReducer,
    strava: stravaReducer,
    leaderboard: leaderboardReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>