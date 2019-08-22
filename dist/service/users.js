"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Repository
const usersRepository = require('../repository/users');
// Model
const User = require('../models/User');
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// User registration
module.exports.register = function register(body) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            // Form validation
            const { errors, isValid } = validateRegisterInput(body);
            // Check validation
            if (!isValid) {
                return errors;
            }
            let user = yield usersRepository.getUserByEmail(body.email);
            if (user) {
                return JSON.stringify({ email: "Email already exists" });
            }
            else {
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
        catch (err) {
            response = err;
        }
        return response;
    });
};
// User login
module.exports.login = function login(body) {
    return __awaiter(this, void 0, void 0, function* () {
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
            let user = yield usersRepository.getUserByEmail(email);
            // Check if user exists
            if (!user) {
                return { emailnotfound: "Email not found" };
            }
            // Check password
            let isMatch = yield bcrypt.compare(password, user.password);
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                const token = yield jwt.sign(payload, keys.secretOrKey, {
                    expiresIn: 31556926 // 1 year in seconds
                });
                response =
                    {
                        success: true,
                        token: "Bearer " + token
                    };
            }
            else {
                return { passwordincorrect: "Password incorrect" };
            }
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Get current user
module.exports.getCurrentUser = function getCurrentUser(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield usersRepository.getUserByID(_id);
    });
};
//# sourceMappingURL=users.js.map