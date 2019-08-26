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
// Dependencies
const axios_1 = __importDefault(require("axios"));
// Repository
const leaderboardRepository = require('../repository/leaderboard');
class LeaderboardClass {
    // Add a new leaderboard
    addLeaderboard(competitionID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let data = yield leaderboardRepository.getRelevantStats(competitionID, userID);
                let name = "";
                let totalTime = 0;
                let averageTime = 0;
                let totalDistance = 0;
                let numberOfRounds = 0;
                for (var i in data) {
                    numberOfRounds++;
                    totalTime += data[i].elapsedTime;
                    totalDistance += data[i].distance;
                    name = data[i].name;
                }
                averageTime = Math.round((totalTime / numberOfRounds) * 100) / 100;
                totalDistance = Math.round(totalDistance * 100) / 100;
                const newLeaderboard = {
                    userID: userID,
                    name: name,
                    competitionID: competitionID,
                    averageTime: averageTime,
                    totalDistance: totalDistance,
                    numberOfRounds: numberOfRounds
                };
                response = yield leaderboardRepository.addLeaderboard(newLeaderboard.userID, newLeaderboard.name, newLeaderboard.competitionID, newLeaderboard.averageTime, newLeaderboard.totalDistance, newLeaderboard.numberOfRounds);
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Reload leaderboard for selected competition
    reloadLeaderboard(competitionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let userIDs = yield leaderboardRepository.getDistinctUserIDs(competitionID);
                for (let i in userIDs) {
                    yield axios_1.default.get(`http://localhost:5000/api/leaderboard/${competitionID}/${userIDs[i]}`);
                }
                response = yield leaderboardRepository.getLeaderboard(competitionID);
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