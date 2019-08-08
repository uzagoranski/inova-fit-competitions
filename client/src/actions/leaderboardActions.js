import axios from 'axios';
import { GET_LEADERBOARD, LEADERBOARD_LOADING, GET_ERRORS } from './types';

export const getLeaderboard = (_id) => dispatch => {
    dispatch(setLeaderboardLoading());
    axios
        .get(`/api/leaderboard/${_id}`)
        .then(res => 
            dispatch({
                type: GET_LEADERBOARD,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
        )
}

export const setLeaderboardLoading = () => {
    return {
        type: LEADERBOARD_LOADING
    }
}