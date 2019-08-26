"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const Stats_1 = __importDefault(require("../models/Stats"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
class LeaderboardClass {
    // Getting stats for different users in selected competition
    getRelevantStats(competitionID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Stats_1.default.find({ "competitionID": competitionID, "userID": userID });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Adding leaderboard based on competition
    addLeaderboard(userID, name, competitionID, averageTime, totalDistance, numberOfRounds) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Leaderboard_1.default.create({ userID: userID, name: name, competitionID: competitionID, averageTime: averageTime, totalDistance: totalDistance, numberOfRounds: numberOfRounds });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Collecting distinct userIDs from stats to send them in getLeaderboard method
    getDistinctUserIDs(competitionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                yield Leaderboard_1.default.deleteMany({ "competitionID": competitionID });
                response = yield Stats_1.default.find({ "competitionID": competitionID }).distinct("userID");
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Get a generated leaderboard for selected competition
    getLeaderboard(competitionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Leaderboard_1.default.find({ "competitionID": competitionID });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
}
module.exports = new LeaderboardClass();
//# sourceMappingURL=leaderboard.js.map