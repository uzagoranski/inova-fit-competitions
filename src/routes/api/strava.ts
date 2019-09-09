// Dependencies
import express from "express";
import stravaService from '../../service/strava';
import statsService from '../../service/stats';

const router = express.Router();

// @route PUT api/strava/:_id/:code
// @desc Authorize user with incoming Strava code
// @access Private
router.put("/:_id/:code", async(req, res) => {
    
    let response = await stravaService.connectStrava(req.params.code, req.params._id);

    await statsService.addStatsUser(req.params._id);

    res.json(response);    
    
});

// @route PUT api/strava/:_id
// @desc Deauthorize users Strava account
// @access Private
router.put("/:_id", async(req, res) => {

    res.json(await stravaService.disconnectStrava(req.params._id));

});

// @route PUT api/strava/refreshToken/:_id/:refresh_token
// @desc Revive access token
// @access Private
router.put("/refreshToken/:_id/:refresh_token", async(req, res) => {

    res.json(await stravaService.refreshAuthenticationToken(req.params.refresh_token, req.params._id));

});

export default router;