// Dependencies
import express from "express";
const router = express.Router();

// Service
const roundsService = require('../../service/rounds');

// Validation deps.
import ValidationError from "../../middleware/errors";
const { celebrate, Joi } = require('celebrate');

// Celebrate add round input validation
const roundValidator = celebrate({

    body: Joi.object().keys({
        date: Joi.string().required().error(new ValidationError("DateEmpty")),
        competitionId: Joi.string().required(),
        stravaSegmentId: Joi.number().required().error(new ValidationError("StravaSegmentIdEmpty"))
    })
    
});

// @route   GET api/rounds/:_id
// @desc    Get all rounds from selected competition
// @access  Private
router.get('/:_id', async(req, res) => {

    res.json(await roundsService.getRounds(req.params._id));

});

// @route   POST api/rounds
// @desc    Post a new round
// @access  Private
router.post('/', roundValidator, async(req, res, next) => {

    try {

        res.json(await(roundsService.addRound(req.body)));

    } catch (err) {

        next(err);

    }
});

// @route   DELETE api/rounds/:_id
// @desc    Delete a round
// @access  Private
router.delete('/:_id', async(req, res) => {
    
    res.json(await roundsService.deleteRound(req.params._id));

});

module.exports = router;