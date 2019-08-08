const express = require("express");
const router = express.Router();
const stravaClientId = require("../../config/keys").stravaClientId;
const stravaClientSecret = require("../../config/keys").stravaClientSecret;
const axios = require('axios');

// Load User model
const User = require("../../models/User");

// Load Stats model
const Stats = require("../../models/Stats");

// Load Leaderboard model
const Leaderboard = require("../../models/Leaderboard");

// @route PUT api/strava
// @desc Authorize user with incoming Strava code
// @access Private
router.put("/:_id/:code", (req, res) => {
    axios.post('https://www.strava.com/oauth/token', {
        client_id: stravaClientId,
        client_secret: stravaClientSecret,
        code: req.params.code,
        grant_type: "authorization_code"
    })
    .then(response => {
        let expiration = new Date();
        User.findByIdAndUpdate(req.params._id, { "stravaUserID": response.data.athlete.id, "stravaAccessToken": response.data.access_token, "stravaRefreshToken": response.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) })
            .then(user => res.json(user))
            .catch(err => res.status(404).json({success: false}));
    })
    .catch(err => res.status(404).json({success: false}));
});

// @route PUT api/strava
// @desc Deauthorize users Strava account
// @access Private
router.put("/:_id", (req, res) => {
    User.findByIdAndUpdate(req.params._id, { "stravaUserID": "", "stravaAccessToken": "", "stravaRefreshToken": "", "accessTokenExpirationDate": "" })
        .then(() => {
            Stats.deleteMany({ "userID": req.params._id })
                .then(() => {
                    Leaderboard.deleteMany({ "userID": req.params._id })
                        .then(() => res.send("Successfully deauthorized strava and removed all data"))
                        .catch(err => res.status(404).json({success: false}));
                })
                .catch(err => res.status(404).json({success: false}));
        })
        .catch(err => res.status(404).json({success: false}));
});

// @route PUT api/strava/refresh
// @desc Revive access token
// @access Private
router.put("/refreshToken/:_id/:refresh_token", (req, res) => {
    axios.post('https://www.strava.com/oauth/token', {
        client_id: stravaClientId,
        client_secret: stravaClientSecret,
        refresh_token: req.params.refresh_token,
        grant_type: "refresh_token"
    })
    .then(response => {
        let expiration = new Date();
        User.findByIdAndUpdate(req.params._id, { "stravaAccessToken": response.data.access_token, "stravaRefreshToken": response.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) })
            .then(res.json(response.data.access_token))
            .catch(err => res.status(404).json({success: false}));
    })
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;