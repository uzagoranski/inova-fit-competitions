import axios from 'axios';
import { GET_COMPETITIONS, GET_COMPETITION, ADD_COMPETITION, DELETE_COMPETITION, COMPETITIONS_LOADING, GET_ERRORS } from './types';

export const getCompetitions = () => async(dispatch) => {
    
    try {

        dispatch(setCompetitionsLoading());

        let res = await axios.get('/api/competitions');

        dispatch({
            type: GET_COMPETITIONS,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getCompetition = (_id) => async(dispatch) => {

    try {

        dispatch(setCompetitionsLoading());

        let res = await axios.get(`/api/competitions/${_id}`);

        dispatch({
            type: GET_COMPETITION,
            payload: res.data
        });        

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const addCompetition = (competition, history) => async(dispatch) => {

    try {

        let res = await axios.post('/api/competitions', competition);
        
        dispatch({
            type: ADD_COMPETITION,
            payload: res.data           
        });

        history.push("/competitions");

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const deleteCompetition = (_id) => async(dispatch) => {

    try {

        await axios.delete(`/api/competitions/${_id}`);

        dispatch({
            type: DELETE_COMPETITION,
            payload: _id
        });

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const setCompetitionsLoading = () => {

    return {
        type: COMPETITIONS_LOADING
    }
}