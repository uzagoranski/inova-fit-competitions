import express from "express";
const router = express.Router();

// Load input validation
const validateAddCompetitionInput = require("../../validation/addCompetition");

// Service
const competitionsService = require('../../service/competitions');

// @route   GET api/competitions
// @desc    Get all competitions
// @access  Private
router.get('/', async(req, res) => {

    res.json(await competitionsService.getAllCompetitions());

});

// @route   POST api/competitions
// @desc    Add a new competition
// @access  Private
router.post('/', async(req, res, next) => {

    try {

            // Form validation
        await validateAddCompetitionInput(req.body);

        res.json(await(competitionsService.addCompetition(req.body)));

    } catch (err) {

        next(err);

    }
});

// @route   GET api/competitions/:_id
// @desc    Get selected competition
// @access  Private
router.get('/:_id', async(req, res) => {

    res.json(await(competitionsService.getSelectedCompetition(req.params._id)));

});

// @route   DELETE api/competitions/:_id
// @desc    Delete a competition
// @access  Private
router.delete('/:_id', async(req, res) => {
    
    res.json(await(competitionsService.deleteCompetition(req.params._id)));

});

module.exports = router;