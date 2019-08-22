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
// Models
const User_1 = __importDefault(require("../models/User"));
// Get user by email
module.exports.getUserByEmail = function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield User_1.default.findOne({ email: email });
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Add new user
module.exports.register = function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield user.save();
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Get user by id
module.exports.getUserByID = function getUserByID(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield User_1.default.findById(_id);
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Get all Strava authenticated users
module.exports.getStravaUsers = function getStravaUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield User_1.default.where("stravaUserID").ne("");
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
//# sourceMappingURL=users.js.map