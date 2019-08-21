// Dependencies
const axios = require('axios');
const stravaClientId = require("../config/keys").stravaClientId;
const stravaClientSecret = require("../config/keys").stravaClientSecret;

// Repository
const stravaRepository = require('../repository/strava');

// Authorize user on Strava with incoming authorization code
module.exports.connectStrava = async function connectStrava(authorizationCode, _id) {

    const expiration = new Date();

    let tokens = await axios.post('https://www.strava.com/oauth/token', {
        client_id: stravaClientId,
        client_secret: stravaClientSecret,
        code: authorizationCode,
        grant_type: "authorization_code"
    });
    
    return await stravaRepository.connectStrava(tokens, _id, expiration);

}

// Remove Strava connection
module.exports.disconnectStrava = async function disconnectStrava(_id) {

    return await stravaRepository.disconnectStrava(_id);
    
}

// Refresh Strava authentication token
module.exports.refreshAuthenticationToken = async function refreshAuthenticationToken(refresh_token, _id) {

    const expiration = new Date();

    let tokens = await axios.post('https://www.strava.com/oauth/token', {
        client_id: stravaClientId,
        client_secret: stravaClientSecret,
        refresh_token: refresh_token,
        grant_type: "refresh_token"
    });

    return await stravaRepository.refreshAuthenticationToken(tokens, _id, expiration);

}