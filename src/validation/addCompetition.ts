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

  // Name checks
  if (Validator.isEmpty(data.name)) {
    
    try {
      
      throw new ValidationError("NameEmpty");

    } catch (err) {

      return err;
    
    }
    
  } else if (competition[0]) {

    try {
      
      throw new ValidationError("NameAlreadyExists");

    } catch (err) {

      return err;
    
    }

  }
  else {
    return "ok";
  }
};