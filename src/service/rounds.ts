// Dependencies
const axios = require('axios');

// Repository
const roundsRepository = require('../repository/rounds');

// Interfaces
import  { IAddRoundForm } from '../common/interfaces';

// Custom errors
import ValidationError from '../middleware/errors';

class RoundsClass {

    // Get full list of all rounds
    async getRounds(competitionID: string) {
        
        return roundsRepository.getRounds(competitionID);

    }

    // Add round
    async addRound(body: IAddRoundForm) {

        // Find round by name
        let round = await roundsRepository.getRoundBySegmentId(body.competitionId, body.stravaSegmentId);

        if (round[0]) {

            throw new ValidationError("StravaSegmentIdAlreadyExists");

        }

        const newRound = {
            date: body.date,
            competitionID: body.competitionId,
            stravaSegmentID: body.stravaSegmentId
        }

        await axios.get(`http://localhost:5000/api/stats/${newRound.competitionID}/${newRound.stravaSegmentID}`);

        return roundsRepository.addRound(newRound.date, newRound.competitionID, newRound.stravaSegmentID);
                
    }

    // Delete round and stats
    async deleteRound(_id: string) {

        return roundsRepository.deleteRound(_id);

    }

    // Get round by Strava segment id
    async getRoundBySegmentId(competitionID: string, stravaSegmentID: string) {

        return roundsRepository.getRoundBySegmentId(competitionID, stravaSegmentID);

    }
}

module.exports = new RoundsClass();