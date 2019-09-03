import axios from 'axios';
import { GET_LEADERBOARD, LEADERBOARD_LOADING, GET_ERRORS } from './types';

export const getLeaderboard = (_id) => async(dispatch) => {
    
    try {

        dispatch(setLeaderboardLoading());

        let res = await axios.get(`/api/leaderboard/${_id}`);

        await dispatch({
            type: GET_LEADERBOARD,
            payload: res.data
        });

    } catch (err) {

        await dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const setLeaderboardLoading = () => {

    return {
        type: LEADERBOARD_LOADING
    }
}