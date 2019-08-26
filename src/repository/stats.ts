// Model
import Stats from '../models/Stats';

class StatsClass {

    // Add stats for specific segment in a competition
    async addStats(userID: string, name: string, competitionID: string, segmentID: string, elapsedTime: number, distance: number) {

        let response;

        try {
            response = await Stats.create({ userID: userID, name: name, competitionID: competitionID, segmentID: segmentID, elapsedTime: elapsedTime, distance: distance });
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Get all stats
    async getStats() {

        let response;

        try {
            response = await Stats.find();
        }
        catch(err) {
            response = err;
        }

        return response;

    }
}

module.exports = new StatsClass();