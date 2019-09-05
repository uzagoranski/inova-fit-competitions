import express from "express";
const router = express.Router();

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Service
const usersService = require('../../service/users');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async(req, res, next) => {

    try {

         // Form validation
        await validateRegisterInput(req.body);

        res.json(await(usersService.register(req.body)));

    } catch (err) {

        next(err);

    }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async(req, res, next) => {

    try {
         
        // Form validation
        await validateLoginInput(req.body);

        res.json(await(usersService.login(req.body)));

    } catch (err) {
            
       next(err);

    }
});

// @route GET api/users/:_id
// @desc Get selected user
// @access Private
router.get('/:_id', async(req, res) => {

    res.json(await usersService.getCurrentUser(req.params._id));

});

module.exports = router;