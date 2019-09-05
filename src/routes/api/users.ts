// Dependencies
import express from "express";
const router = express.Router();

// Service
const usersService = require('../../service/users');

// Validation deps.
import ValidationError from "../../middleware/errors";
const { celebrate, Joi } = require('celebrate');

// Celebrate login input validation
const loginValidator = celebrate({

    body: Joi.object().keys({
        email: Joi.string().required().error(new ValidationError("EmailEmpty")),
        password: Joi.string().required().error(new ValidationError("PasswordEmpty"))
    })
});

// Celebrate register input validation
const registerValidator = celebrate({

    body: Joi.object().keys({
        name: Joi.string().required().error(new ValidationError("NameEmpty")),
        email: Joi.string().required().error(new ValidationError("EmailEmpty")),
        password: Joi.string().required().error(new ValidationError("PasswordEmpty")),
        password2: Joi.string().required().error(new ValidationError("Password2Empty"))
    })
});


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", registerValidator, async(req, res, next) => {

    try {

        res.json(await(usersService.register(req.body)));

    } catch (err) {

        next(err);

    }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", loginValidator, async(req, res, next) => {

    try {

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