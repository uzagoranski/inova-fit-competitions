// Dependencies
const axios = require('axios');

// Repository
const roundsRepository = require('../repository/rounds');

// Model
const Round = require('../models/Round');

// Interfaces
import  { IAddRoundForm } from '../common/interfaces';

class RoundsClass {

    // Get full list of all rounds
    async getRounds(competitionID: string) {
        
        return roundsRepository.getRounds(competitionID);

    }

    // Add round
    async addRound(body: IAddRoundForm) {

        let response;

        try {
            const newRound = new Round({
                date: body.date,
                competitionID: body.competitionId,
                stravaSegmentID: body.stravaSegmentId
            });
            let round = await roundsRepository.addRound(newRound);

            await axios.get(`http://localhost:5000/api/stats/${round.competitionID}/${round.stravaSegmentID}`);
                
            response = round;
        }
        catch(err) {
            response = err;
        }

        return response;  

    }

    // Delete round and stats
    async deleteRound(_id: string) {

        return roundsRepository.deleteRound(_id);

    }
}

module.exports = new RoundsClass();