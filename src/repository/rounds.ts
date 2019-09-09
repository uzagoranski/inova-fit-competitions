// Models
import Round from '../models/Round';
import Stats from '../models/Stats';

class RoundsClass {

    // Rounds list for selected competition
    async getRounds(competitionID: string) {

        return Round.find({ competitionID }).sort({ date: 1 });

    }

    // Add round
    async addRound(date: string, competitionID: string, stravaSegmentID: string) {

        return Round.create({ date, competitionID, stravaSegmentID });

    }

    // Delete round and stats
    async deleteRound(_id: string) {

        const round = await Round.findById(_id);

        const { competitionID, stravaSegmentID } = round;

        await Promise.all([Stats.deleteMany({ competitionID, segmentID: stravaSegmentID }), round.remove()]);

        const response = { success: true };

        return response;

    }

    // Rounds list for selected competition
    async getSegmentIDs() {

        return Round.find().sort({ date: 1 });

    }

    // Get round by segment id
    async getRoundBySegmentId(competitionID: string, stravaSegmentID: string) {

        return Round.findOne({ competitionID, stravaSegmentID });

    }
}

export default new RoundsClass();
