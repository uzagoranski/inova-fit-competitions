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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Service
const usersService = require('../../service/users');
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Form validation
    let validation = yield validateRegisterInput(req.body);
    if (validation == "ok") {
        res.json(yield (usersService.register(req.body)));
    }
    else {
        res.status(validation.statusCode).json(validation.message);
    }
}));
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Form validation
    let validation = yield validateLoginInput(req.body);
    if (validation == "ok") {
        res.json(yield (usersService.login(req.body)));
    }
    else {
        res.status(validation.statusCode).json(validation.message);
    }
}));
// @route GET api/users/:_id
// @desc Get selected user
// @access Private
router.get('/:_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield usersService.getCurrentUser(req.params._id));
}));
module.exports = router;
//# sourceMappingURL=users.js.map