// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Repository
const usersRepository = require('../repository/users');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// User registration
module.exports.register = async function register(body) {

    let response;

    try {
      // Form validation
      const { errors, isValid } = validateRegisterInput(body);
  
      // Check validation
      if (!isValid) {
        return errors;
      }

      let user = await usersRepository.getUserByEmail(body.email);
  
      if (user) {
  
        return JSON.stringify({ email: "Email already exists" });
  
      } else {
  
        const newUser = new User({
          name: body.name,
          email: body.email,
          password: body.password
        });
  
        // Hash password before saving user in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            response = usersRepository.register(newUser);
          });
        });
      }
    }
    catch(err) {
      response = err;
    }
  
    return response;
}

// User login
module.exports.login = async function login(body) {

    let response;

    try {
        // Form validation
        const { errors, isValid } = validateLoginInput(body);

        // Check validation
        if (!isValid) {
            return errors;
        }

        const email = body.email;
        const password = body.password;

        // Find user by email
        let user = await usersRepository.getUserByEmail(email);

        // Check if user exists
        if (!user) {
            return { emailnotfound: "Email not found" };
        }

        // Check password
        let isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
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
        } else {
            return { passwordincorrect: "Password incorrect" };
        }
    }
    catch(err) {
        response = err;
    }

    return response;    
}

// Get current user
module.exports.getCurrentUser = async function getCurrentUser(_id) {

    return await usersRepository.getUserByID(_id);

}