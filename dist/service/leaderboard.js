var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Repository
const leaderboardRepository = require('../repository/leaderboard');
class LeaderboardClass {
    // Reload leaderboard for selected competition
    getLeaderboard(competitionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let stats = yield leaderboardRepository.getAllStatsForCompetition(competitionID);
                let userIDs = yield leaderboardRepository.getDistinctUserIDs(competitionID);
                let responseValue = [];
                for (let i in userIDs) {
                    let name = "";
                    let totalTime = 0;
                    let averageTime = 0;
                    let totalDistance = 0;
                    let numberOfRounds = 0;
                    for (let j in stats) {
                        if (stats[j].userID == userIDs[i]) {
                            numberOfRounds++;
                            totalTime += stats[j].elapsedTime;
                            totalDistance += stats[j].distance;
                            name = stats[j].name;
                        }
                    }
                    averageTime = Math.round((totalTime / numberOfRounds) * 100) / 100;
                    totalDistance = Math.round(totalDistance * 100) / 100;
                    responseValue.push({
                        userID: userIDs[i],
                        name: name,
                        competitionID: competitionID,
                        averageTime: averageTime,
                        totalDistance: totalDistance,
                        numberOfRounds: numberOfRounds
                    });
                }
                response = responseValue;
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