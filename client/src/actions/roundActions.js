import axios from 'axios';
import { GET_ROUNDS, ADD_ROUND, DELETE_ROUND, ROUNDS_LOADING, GET_ERRORS } from './types';

export const getRounds = (_id) => dispatch => {
    dispatch(setRoundsLoading());
    axios
        .get(`/api/rounds/${_id}`)
        .then(res => 
            dispatch({
                type: GET_ROUNDS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
        );
}

export const addRound = (round, history, _id) => (dispatch) => {
    axios
        .post('/api/rounds', round)
        .then(res => 
            dispatch({
                type: ADD_ROUND,
                payload: res.data
            })
        )     
        .then(res => history.push(`/competition/${_id}`))    
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
        );
}

export const deleteRound = (_id) => (dispatch) => {
    axios
        .delete(`/api/rounds/${_id}`)
        .then(res =>
            dispatch({
                type: DELETE_ROUND,
                payload: _id
            })
        )
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
        );
}

export const setRoundsLoading = () => {
    return {
        type: ROUNDS_LOADING
    }
}