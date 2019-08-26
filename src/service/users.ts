// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Repository
const usersRepository = require('../repository/users');

// Interfaces
import  { IRegistrationForm } from '../common/interfaces';
import  { ILoginForm } from '../common/interfaces';

class UsersClass {

  // User registration
  async register(body: IRegistrationForm) {

    let response;

    try {
          
      const newUser = {
        name: body.name,
        email: body.email,
        password: body.password
      }

      // Hash password before saving user in database
      bcrypt.genSalt(10, (err: string, salt: string) => {
        bcrypt.hash(newUser.password, salt, (err: string, hash: string) => {
          newUser.password = hash;
          response = usersRepository.register(newUser.name, newUser.email, newUser.password);
        });
      });
    } catch(err) {

      response = err;

    }

    return response;
  }

  // User login
  async login(body: ILoginForm) {

    let response;

    try {

      // Find user by email
      let user = await usersRepository.getUserByEmail(body.email);    

      // Create JWT Payload
      const payload = {
          id: user.id,
          name: user.name
      };

      // Sign token
      const token = await jwt.sign(
          payload,
          keys.secretOrKey,
          {
              expiresIn: 31556926 // 1 year in seconds
          }
      );

      response =
          {
          success: true,
          token: "Bearer " + token
          }
        
    }
    catch(err) {

        response = err;
        
    }

    return response;    
  }

  // Get current user
  async getCurrentUser(_id: string) {

    return await usersRepository.getUserByID(_id);

  }
}

module.exports = new UsersClass();