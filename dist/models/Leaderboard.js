"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const LeaderboardSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    competitionID: {
        type: String,
        required: true
    },
    averageTime: {
        type: Number,
        required: true
    },
    totalDistance: {
        type: Number,
        required: true
    },
    numberOfRounds: {
        type: Number,
        required: true
    },
});
const Leaderboard = mongoose_1.default.model('leaderboard', LeaderboardSchema);
exports.default = Leaderboard;
//# sourceMappingURL=Leaderboard.js.map