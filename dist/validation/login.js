"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = __importDefault(require("is-empty"));
const bcrypt = require("bcryptjs");
const errors_1 = __importDefault(require("../middleware/errors"));
// Repository
const usersRepository = require('../repository/users');
module.exports = function validateLoginInput(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find user by email
        let user = yield usersRepository.getUserByEmail(data.email);
        // Convert empty fields to an empty string so we can use validator functions
        data.email = !is_empty_1.default(data.email) ? data.email : "";
        data.password = !is_empty_1.default(data.password) ? data.password : "";
        // Email checks
        if (validator_1.default.isEmpty(data.email)) {
            try {
                throw new errors_1.default("EmailEmpty");
            }
            catch (err) {
                return err;
            }
        }
        else if (!validator_1.default.isEmail(data.email)) {
            try {
                throw new errors_1.default("EmailInvalid");
            }
            catch (err) {
                return err;
            }
            // Password checks
        }
        else if (validator_1.default.isEmpty(data.password)) {
            try {
                throw new errors_1.default("PasswordEmpty");
            }
            catch (err) {
                return err;
            }
        }
        else if (!user) {
            try {
                throw new errors_1.default("UserNotFound");
            }
            catch (err) {
                return err;
            }
        }
        else if (!(yield bcrypt.compare(data.password, user.password))) {
            try {
                throw new errors_1.default("PasswordIncorrect");
            }
            catch (err) {
                return err;
            }
        }
        else {
            return "ok";
        }
    });
};
//# sourceMappingURL=login.js.map