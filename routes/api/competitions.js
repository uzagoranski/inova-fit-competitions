const express = require('express');
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
router.post('/', async(req, res) => {
    
    // Form validation
    const { errors, isValid } = validateAddCompetitionInput(req.body);
        
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    res.json(await(competitionsService.addCompetition(req.body)));
   
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