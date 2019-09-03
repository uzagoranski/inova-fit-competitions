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

    // Name checks
    if (Validator.isEmpty(data.name)) {
        
        try {
        
            throw new ValidationError("NameEmpty");

        } catch (err) {

            return err;
        
        }

    // Email checks
    } else if (Validator.isEmpty(data.email)) {
        
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

    } else if (Validator.isEmpty(data.password2)) {
        
        try {
            
            throw new ValidationError("Password2Empty");

        } catch (err) {

            return err;
        
        }

    } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {

        try {
            
            throw new ValidationError("PasswordInvalid");

        } catch (err) {

            return err;
        
        }

    } else if (!Validator.equals(data.password, data.password2)) {

        try {
            
            throw new ValidationError("PasswordDismatch");

        } catch (err) {

            return err;
        
        }
        
    // User checks
    } else if (user) {

        try {
            
            throw new ValidationError("UserAlreadyExists");

        } catch (err) {

            return err;
        
        }

    } else {

        return "ok";

    }
}