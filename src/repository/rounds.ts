// Models
import Round from '../models/Round';
import Stats from '../models/Stats';

class RoundsClass {

    // Rounds list for selected competition
    async getRounds(competitionID: string) {

        let response;

        try {
            response = await Round.find({ "competitionID": competitionID }).sort({ date: 1 });
        }
        catch(err) {
            response = err;
        }

        return response;  

    }

    // Add round
    async addRound(date: Date, competitionID: string, stravaSegmentID: string) {

        let response;

        try {
            response = await Round.create({ date: date, competitionID: competitionID, stravaSegmentID: stravaSegmentID });
        }
        catch(err) {
            response = err;
        }

        return response;  

    }

    // Delete round and stats
    async deleteRound(_id: string) {

        let response;

        try {
            let round = await Round.findById(_id)

            let competitionID = round.competitionID;
            let stravaSegmentID = round.stravaSegmentID;

            await Promise.all([round.remove(), Stats.deleteMany({ "competitionID": competitionID, "segmentID": stravaSegmentID })]);
        
            response = {success: true};
        }
        catch(err) {
            response = err;
        }

        return response; 

    }

    // Rounds list for selected competition
    async getSegmentIDs() {

        let response;

        try {
            response = await Round.find().sort({ date: 1 });
        }
        catch(err) {
            response = err;
        }

        return response;  

    }

     // Get round by segment id
     async getRoundBySegmentId(competitionID: string, stravaSegmentID: string) {

        let response;

        try {
            response = await Round.find({ "competitionID": competitionID, "stravaSegmentID": stravaSegmentID });
        }
        catch(err) {
            response = err;
        }

        return response;  

    }
}

module.exports = new RoundsClass();