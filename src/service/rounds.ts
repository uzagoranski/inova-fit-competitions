// Dependencies
import roundsRepository from '../repository/rounds';
import statsService from '../service/stats';
import { IAddRoundForm } from '../common/interfaces';
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

        if (round) {

            throw new ValidationError("StravaSegmentIdAlreadyExists");

        }

        const newRound = {
            date: body.date,
            competitionID: body.competitionId,
            stravaSegmentID: body.stravaSegmentId
        }

        await statsService.addStatsRound(newRound.competitionID, newRound.stravaSegmentID);

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

export default new RoundsClass();