// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Repository
const usersRepository = require('../repository/users');

// Interfaces
import  { IRegistrationForm } from '../common/interfaces';
import  { ILoginForm } from '../common/interfaces';

// Custom errors
import ValidationError from '../middleware/errors';
import Validator from "validator";

class UsersClass {

    // User registration
    async register(body: IRegistrationForm) {
           
        // Find user by email
        let user = await usersRepository.getUserByEmail(body.email);    

        // Validation
        if (!Validator.isEmail(body.email)) {

            throw new ValidationError("EmailInvalid");

        } else if (user) {

            throw new ValidationError("UserAlreadyExists");

        } else if (!Validator.isLength(body.password, { min: 6, max: 30 })) {

            throw new ValidationError("PasswordInvalid");
    
        } else if (!Validator.equals(body.password, body.password2)) {
    
            throw new ValidationError("PasswordDismatch");

        }

        const newUser = {
            name: body.name,
            email: body.email,
            password: body.password
        }

        // Hash password before saving user in database
        bcrypt.genSalt(10, (err: string, salt: string) => {
            bcrypt.hash(newUser.password, salt, (err: string, hash: string) => {
                newUser.password = hash;
                return usersRepository.register(newUser.name, newUser.email, newUser.password);
            });
        });
    }

    // User login
    async login(body: ILoginForm) {

        // Find user by email
        let user = await usersRepository.getUserByEmail(body.email);    

        // Validation

        // Validation
        if (!Validator.isEmail(body.email)) {

            throw new ValidationError("EmailInvalid");

        } else if (!user) {

            throw new ValidationError("UserNotFound");
    
        } else if (!await bcrypt.compare(body.password, user.password)) {
    
            throw new ValidationError("PasswordIncorrect");

        }

        // Create JWT Payload
        const payload = {
            id: user.id,
            name: user.name
        };

        // Sign token
        const token = await jwt.sign(
            payload,
            process.env.secretOrKey,
            {
                expiresIn: 31556926 // 1 year in seconds
            }
        );

        let response =
            {
                success: true,
                token: "Bearer " + token
            } 

        return response;    
    }

    // Get current user
    async getCurrentUser(_id: string) {

        return usersRepository.getUserByID(_id);

    }
}

module.exports = new UsersClass();