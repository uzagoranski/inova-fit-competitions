import express from "express";
const router = express.Router();

// Service
const statsService = require('../../service/stats');

// @route GET api/stats/:competionID/:segmentID
// @desc Get all users with Strava connection within "New Round" method
// @access Private
router.get("/:competitionID/:segmentID", async(req, res) => {

    res.json(await statsService.addStatsRound(req.params.competitionID, req.params.segmentID));

});

module.exports = router;