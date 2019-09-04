import axios from 'axios';
import { GET_ROUNDS, ADD_ROUND, DELETE_ROUND, ROUNDS_LOADING, GET_ERRORS } from './types';
import { Dispatch } from 'redux';
import { IAddRoundForm } from '../../../src/common/interfaces';
import { History } from 'history';

export const getRounds = (_id: string) => async(dispatch: Dispatch) => {

    try {

        dispatch(setRoundsLoading());

        let res = await axios.get(`/api/rounds/${_id}`);

        dispatch({
            type: GET_ROUNDS,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const addRound = (round: IAddRoundForm, history: History, _id: string) => async(dispatch: Dispatch) => {

    try {

        let res = await axios.post('/api/rounds', round);

        dispatch({
            type: ADD_ROUND,
            payload: res.data
        });

        history.push(`/competition/${_id}`);

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }
}

export const deleteRound = (_id: string) => async(dispatch: Dispatch) => {

    try {

        await axios.delete(`/api/rounds/${_id}`);

        dispatch({
            type: DELETE_ROUND,
            payload: _id
        });

    } catch (err) {

        dispatch({
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