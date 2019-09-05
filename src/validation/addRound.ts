import Validator from "validator";
import isEmpty from "is-empty";

// Interfaces
import  { IAddRoundForm } from '../common/interfaces';
import ValidationError from "../middleware/errors";

// Repository
const roundRepository = require('../repository/rounds');

module.exports = async function validateAddRoundInput(data: IAddRoundForm) {

    // Find competition by name
    let round = await roundRepository.getRoundBySegmentId(data.competitionId, data.stravaSegmentId);

    // Convert empty fields to an empty string so we can use validator functions
    data.date = !isEmpty(data.date) ? data.date : "";
    data.stravaSegmentId = !isEmpty(data.stravaSegmentId) ? data.stravaSegmentId : "";

    // Input checks
    if (Validator.isEmpty(data.date)) {

        throw new ValidationError("DateEmpty");

    } else if (Validator.isEmpty(data.stravaSegmentId)) {

        throw new ValidationError("StravaSegmentIdEmpty");

    } else if (round[0]) {

        throw new ValidationError("StravaSegmentIdAlreadyExists");
    
    } else {
        
        return true;

    }
}