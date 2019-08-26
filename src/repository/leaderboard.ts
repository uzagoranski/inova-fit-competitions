// Models
import Stats from '../models/Stats';
import Leaderboard from '../models/Leaderboard';

class LeaderboardClass {

    // Getting stats for different users in selected competition
    async getRelevantStats(competitionID: string, userID: string) {

        let response;
        
        try {
            response = await Stats.find({ "competitionID": competitionID, "userID": userID });
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Adding leaderboard based on competition
    async addLeaderboard(userID: string, name: string, competitionID: string, averageTime: number, totalDistance: number, numberOfRounds: number) {

        let response;

        try {
            response = await Leaderboard.create({ userID: userID, name: name, competitionID: competitionID, averageTime: averageTime, totalDistance: totalDistance, numberOfRounds: numberOfRounds });
        }
        catch(err) {
            response = err;
        }
        
        return response;  

    }

    // Collecting distinct userIDs from stats to send them in getLeaderboard method
    async getDistinctUserIDs(competitionID: string) {
        
        let response;
        
        try {
            await Leaderboard.deleteMany({ "competitionID": competitionID });

            response = await Stats.find({ "competitionID": competitionID }).distinct("userID");
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Get a generated leaderboard for selected competition
    async getLeaderboard(competitionID: string) {
        
        let response;
        
        try {
            response = await Leaderboard.find({ "competitionID": competitionID });
        }
        catch(err) {
            response = err;
        }

        return response;
        
    }
}

module.exports = new LeaderboardClass();