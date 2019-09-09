// Models
import Stats from '../models/Stats';

class LeaderboardClass {

    // Collecting distinct userIDs from stats to send them in getLeaderboard method
    async getDistinctUserIDs(competitionID: string) {

        return Stats.find({ competitionID }).distinct('userID');

    }

    // Get a generated leaderboard for selected competition
    async getAllStatsForCompetition(competitionID: string) {

        return Stats.find({ competitionID });

    }
}

export default new LeaderboardClass();
