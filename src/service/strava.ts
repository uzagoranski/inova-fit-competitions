// Dependencies
import axios from 'axios';
import stravaRepository from '../repository/strava';

require('dotenv').config();

const { stravaClientId, stravaClientSecret } = process.env;


class StravaClass {

    // Authorize user on Strava with incoming authorization code
    async connectStrava(authorizationCode: string, _id: string) {

        const expiration = new Date();

        const tokens = await axios.post('https://www.strava.com/oauth/token', {
            client_id: stravaClientId,
            client_secret: stravaClientSecret,
            code: authorizationCode,
            grant_type: 'authorization_code'
        });

        return stravaRepository.connectStrava(tokens, _id, expiration);

    }

    // Remove Strava connection
    async disconnectStrava(_id: string) {

        return stravaRepository.disconnectStrava(_id);

    }

    // Refresh Strava authentication token
    async refreshAuthenticationToken(refresh_token: string, _id: string) {

        const expiration = new Date();

        const tokens = await axios.post('https://www.strava.com/oauth/token', {
            client_id: stravaClientId,
            client_secret: stravaClientSecret,
            refresh_token,
            grant_type: 'refresh_token'
        });

        return stravaRepository.refreshAuthenticationToken(tokens, _id, expiration);

    }
}

export default new StravaClass();
