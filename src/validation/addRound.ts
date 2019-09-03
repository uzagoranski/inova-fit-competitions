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

    // Date checks
    if (Validator.isEmpty(data.date)) {
        
        try {
        
            throw new ValidationError("DateEmpty");

        } catch (err) {

            return err;
        
        }
        
    // Id checks
    } else if (Validator.isEmpty(data.stravaSegmentId)) {
        
        try {
        
            throw new ValidationError("StravaSegmentIdEmpty");

        } catch (err) {

            return err;
        
        }
        
    // Round checks
    } else if (round[0]) {
        
        try {
        
            throw new ValidationError("StravaSegmentIdAlreadyExists");

        } catch (err) {

            return err;
        
        }
    
    } else {
        
        return "ok";

    }
}