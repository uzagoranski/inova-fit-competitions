// Models
import Stats from '../models/Stats';

class LeaderboardClass {

    // Collecting distinct userIDs from stats to send them in getLeaderboard method
    async getDistinctUserIDs(competitionID: string) {
        
        let response;
        
        try {
            response = await Stats.find({ "competitionID": competitionID }).distinct("userID");
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Get a generated leaderboard for selected competition
    async getAllStatsForCompetition(competitionID: string) {
        
        let response;
        
        try {
            response = await Stats.find({ "competitionID": competitionID });
        }
        catch(err) {
            response = err;
        }

        return response;
        
    }
}

module.exports = new LeaderboardClass();