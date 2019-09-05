import Validator from "validator";
import isEmpty from "is-empty";

// Interfaces
import  { IAddCompetitionForm } from '../common/interfaces';
import ValidationError from "../middleware/errors";

// Repository
const competitionsRepository = require('../repository/competitions');

module.exports = async function validateAddCompetitionInput(data: IAddCompetitionForm) {

    // Find competition by name
    let competition = await competitionsRepository.getCompetitionByName(data.name);

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";

    // Input checks
    if (Validator.isEmpty(data.name)) {
      
        throw new ValidationError("NameEmpty");
        
    } else if (competition[0]) {
        
        throw new ValidationError("NameAlreadyExists");

    } else {

        return true;
        
    }
}