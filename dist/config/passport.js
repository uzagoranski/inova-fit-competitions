"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const opts = {};
const keys_1 = __importDefault(require("./keys"));
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys_1.default.secretOrKey;
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then((user) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch((err) => console.log(err));
    }));
};
//# sourceMappingURL=passport.js.map