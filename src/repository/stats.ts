// Model
import Stats from '../models/Stats';

class StatsClass {

    // Add stats for specific segment in a competition
    async addStats(userID: string, name: string, competitionID: string, segmentID: string, elapsedTime: number, distance: number) {

        return Stats.create({ userID, name, competitionID, segmentID, elapsedTime, distance });

    }

    // Get all stats
    async getStats() {

        return Stats.find();

    }
}

export default new StatsClass();
