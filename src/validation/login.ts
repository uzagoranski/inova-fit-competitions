import Validator from "validator";
import isEmpty from "is-empty";
const bcrypt = require("bcryptjs");

// Interfaces
import  { ILoginForm } from '../common/interfaces';
import ValidationError from "../middleware/errors";

// Repository
const usersRepository = require('../repository/users');

module.exports = async function validateLoginInput(data: ILoginForm) {

  // Find user by email
  let user = await usersRepository.getUserByEmail(data.email);

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    
    try {
      
      throw new ValidationError("EmailEmpty");

    } catch (err) {

      return err;
    
    }
    
  } else if (!Validator.isEmail(data.email)) {

    try {
      
      throw new ValidationError("EmailInvalid");

    } catch (err) {

      return err;
    
    }

  // Password checks
  } else if (Validator.isEmpty(data.password)) {

    try {
      
      throw new ValidationError("PasswordEmpty");

    } catch (err) {

      return err;
    
    }

  } else if (!user) {

    try {
      
      throw new ValidationError("UserNotFound");

    } catch (err) {

      return err;
    
    }

  } else if (!await bcrypt.compare(data.password, user.password)) {

    try {
      
      throw new ValidationError("PasswordIncorrect");

    } catch (err) {

      return err;
    
    }

  }
  else {
    return "ok";
  }
};