// Model
import Stats from '../models/Stats';

class StatsClass {

    // Add stats for specific segment in a competition
    async addStats(userID: string, name: string, competitionID: string, segmentID: string, elapsedTime: number, distance: number) {

        return Stats.create({ userID: userID, name: name, competitionID: competitionID, segmentID: segmentID, elapsedTime: elapsedTime, distance: distance });
    
    }

    // Get all stats
    async getStats() {

        return Stats.find();

    }
}

module.exports = new StatsClass();