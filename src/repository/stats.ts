// Model
import Stats, { IStats } from '../models/Stats';

class StatsClass {

    // Add stats for specific segment in a competition
    async addStats(newStats: IStats) {

        let response;

        try {
            response = await newStats.save();
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