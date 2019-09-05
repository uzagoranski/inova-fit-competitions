"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
class UsersClass {
    // User registration
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                const newUser = {
                    name: body.name,
                    email: body.email,
                    password: body.password
                };
                // Hash password before saving user in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        response = usersRepository.register(newUser.name, newUser.email, newUser.password);
                    });
                });
            }
            catch (err) {
                response = err;
            }
            return yield response;
        });
    }
    // User login
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                // Find user by email
                let user = yield usersRepository.getUserByEmail(body.email);
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                const token = yield jwt.sign(payload, process.env.secretOrKey, {
                    expiresIn: 31556926 // 1 year in seconds
                });
                response =
                    {
                        success: true,
                        token: "Bearer " + token
                    };
            }
            catch (err) {
                response = err;
            }
            return yield response;
        });
    }
    // Get current user
    getCurrentUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usersRepository.getUserByID(_id);
        });
    }
}
module.exports = new UsersClass();
//# sourceMappingURL=users.js.map