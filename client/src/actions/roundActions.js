import axios from 'axios';
import { GET_ROUNDS, ADD_ROUND, DELETE_ROUND, ROUNDS_LOADING, GET_ERRORS } from './types';

export const getRounds = (_id) => async(dispatch) => {

    try {

        dispatch(setRoundsLoading());

        let res = await axios.get(`/api/rounds/${_id}`);

        await dispatch({
            type: GET_ROUNDS,
            payload: res.data
        });
        
    } catch (err) {

        await dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const addRound = (round, history, _id) => async(dispatch) => {

    try {

        let res = await axios.post('/api/rounds', round);

        await dispatch({
            type: ADD_ROUND,
            payload: res.data
        });

        history.push(`/competition/${_id}`);

    } catch (err) {

        await dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }
}

export const deleteRound = (_id) => async(dispatch) => {

    try {

        await axios.delete(`/api/rounds/${_id}`);

        await dispatch({
            type: DELETE_ROUND,
            payload: _id
        });

    } catch (err) {

        await dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const setRoundsLoading = () => {

    return {
        type: ROUNDS_LOADING
    }
}