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

    // Input checks
    if (Validator.isEmpty(data.email)) {

        throw new ValidationError("EmailEmpty");
        
    } else if (!Validator.isEmail(data.email)) {

        throw new ValidationError("EmailInvalid");

    } else if (Validator.isEmpty(data.password)) {

        throw new ValidationError("PasswordEmpty");

    } else if (!user) {

        throw new ValidationError("UserNotFound");

    } else if (!await bcrypt.compare(data.password, user.password)) {

        throw new ValidationError("PasswordIncorrect");

    } else {

        return true;

    } 
}