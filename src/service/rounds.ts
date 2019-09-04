// Dependencies
const axios = require('axios');

// Repository
const roundsRepository = require('../repository/rounds');

// Interfaces
import  { IAddRoundForm } from '../common/interfaces';

class RoundsClass {

    // Get full list of all rounds
    async getRounds(competitionID: string) {
        
        return await roundsRepository.getRounds(competitionID);

    }

    // Add round
    async addRound(body: IAddRoundForm) {

        let response;

        try {
            const newRound = {
                date: body.date,
                competitionID: body.competitionId,
                stravaSegmentID: body.stravaSegmentId
            }

            await axios.get(`http://localhost:5000/api/stats/${newRound.competitionID}/${newRound.stravaSegmentID}`);

            let round = await roundsRepository.addRound(newRound.date, newRound.competitionID, newRound.stravaSegmentID);
                
            response = round;
        }
        catch(err) {
            response = err;
        }

        return response;  

    }

    // Delete round and stats
    async deleteRound(_id: string) {

        return await roundsRepository.deleteRound(_id);

    }

    // Get round by Strava segment id
    async getRoundBySegmentId(competitionID: string, stravaSegmentID: string) {

        return await roundsRepository.getRoundBySegmentId(competitionID, stravaSegmentID);

    }
}

module.exports = new RoundsClass();