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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = __importDefault(require("is-empty"));
const errors_1 = __importDefault(require("../middleware/errors"));
// Repository
const usersRepository = require('../repository/users');
module.exports = function validateRegisterInput(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find user by email
        let user = yield usersRepository.getUserByEmail(data.email);
        // Convert empty fields to an empty string so we can use validator functions
        data.name = !is_empty_1.default(data.name) ? data.name : "";
        data.email = !is_empty_1.default(data.email) ? data.email : "";
        data.password = !is_empty_1.default(data.password) ? data.password : "";
        data.password2 = !is_empty_1.default(data.password2) ? data.password2 : "";
        // Name checks
        if (validator_1.default.isEmpty(data.name)) {
            try {
                throw new errors_1.default("NameEmpty");
            }
            catch (err) {
                return err;
            }
            // Email checks
        }
        else if (validator_1.default.isEmpty(data.email)) {
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
        else if (validator_1.default.isEmpty(data.password2)) {
            try {
                throw new errors_1.default("Password2Empty");
            }
            catch (err) {
                return err;
            }
        }
        else if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
            try {
                throw new errors_1.default("PasswordInvalid");
            }
            catch (err) {
                return err;
            }
        }
        else if (!validator_1.default.equals(data.password, data.password2)) {
            try {
                throw new errors_1.default("PasswordDismatch");
            }
            catch (err) {
                return err;
            }
            // User checks
        }
        else if (user) {
            try {
                throw new errors_1.default("UserAlreadyExists");
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
//# sourceMappingURL=register.js.map