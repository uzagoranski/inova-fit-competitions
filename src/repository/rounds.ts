// Models
import Round from '../models/Round';
import Stats from '../models/Stats';

class RoundsClass {

    // Rounds list for selected competition
    async getRounds(competitionID: string) {

        return Round.find({ "competitionID": competitionID }).sort({ date: 1 });

    }

    // Add round
    async addRound(date: Date, competitionID: string, stravaSegmentID: string) {

        return Round.create({ date: date, competitionID: competitionID, stravaSegmentID: stravaSegmentID });

    }

    // Delete round and stats
    async deleteRound(_id: string) {

        let round = await Round.findById(_id)

        let competitionID = round.competitionID;
        let stravaSegmentID = round.stravaSegmentID;

        await Promise.all([Stats.deleteMany({ "competitionID": competitionID, "segmentID": stravaSegmentID }), round.remove()]);
    
        let response = {success: true};

        return response; 

    }

    // Rounds list for selected competition
    async getSegmentIDs() {

        return Round.find().sort({ date: 1 });
      
    }

    // Get round by segment id
    async getRoundBySegmentId(competitionID: string, stravaSegmentID: string) {

        return Round.find({ "competitionID": competitionID, "stravaSegmentID": stravaSegmentID });
  
    }
}

module.exports = new RoundsClass();