"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const authReducer_1 = __importDefault(require("./authReducer"));
const errorReducer_1 = __importDefault(require("./errorReducer"));
const competitionReducer_1 = __importDefault(require("./competitionReducer"));
const roundReducer_1 = __importDefault(require("./roundReducer"));
const accountReducer_1 = __importDefault(require("./accountReducer"));
const stravaReducer_1 = __importDefault(require("./stravaReducer"));
const leaderboardReducer_1 = __importDefault(require("./leaderboardReducer"));
exports.default = redux_1.combineReducers({
    auth: authReducer_1.default,
    errors: errorReducer_1.default,
    competition: competitionReducer_1.default,
    round: roundReducer_1.default,
    user: accountReducer_1.default,
    strava: stravaReducer_1.default,
    leaderboard: leaderboardReducer_1.default
});
//# sourceMappingURL=index.js.map