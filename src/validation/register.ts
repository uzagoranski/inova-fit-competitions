import Validator from "validator";
import isEmpty from "is-empty";

// Interfaces
import  { IRegistrationForm } from '../common/interfaces';
import ValidationError from "../middleware/errors";

// Repository
const usersRepository = require('../repository/users');

module.exports = async function validateRegisterInput(data: IRegistrationForm) {

    // Find user by email
    let user = await usersRepository.getUserByEmail(data.email);

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Input checks
    if (Validator.isEmpty(data.name)) {

        throw new ValidationError("NameEmpty");

    } else if (Validator.isEmpty(data.email)) {
 
        throw new ValidationError("EmailEmpty");

    } else if (!Validator.isEmail(data.email)) {

        throw new ValidationError("EmailInvalid");

    } else if (Validator.isEmpty(data.password)) {

        throw new ValidationError("PasswordEmpty");

    } else if (Validator.isEmpty(data.password2)) {

        throw new ValidationError("Password2Empty");

    } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {

        throw new ValidationError("PasswordInvalid");

    } else if (!Validator.equals(data.password, data.password2)) {

        throw new ValidationError("PasswordDismatch");
        
    } else if (user) {

        throw new ValidationError("UserAlreadyExists");

    } else {

        return true;

    }
}