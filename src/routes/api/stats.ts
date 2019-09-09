// Dependencies
import express from "express";
import statsService from '../../service/stats';

const router = express.Router();

// @route GET api/stats/:competionID/:segmentID
// @desc Get all users with Strava connection within "New Round" method
// @access Private
router.get("/:competitionID/:segmentID", async(req, res) => {

    res.json(await statsService.addStatsRound(req.params.competitionID, req.params.segmentID));

});

export default router;