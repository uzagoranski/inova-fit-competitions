import axios from 'axios';
import { GET_COMPETITIONS, GET_COMPETITION, ADD_COMPETITION, DELETE_COMPETITION, COMPETITIONS_LOADING, GET_ERRORS } from './types';

export const getCompetitions = () => dispatch => {
    dispatch(setCompetitionsLoading());
    axios
        .get('/api/competitions')
        .then(res => 
            dispatch({
                type: GET_COMPETITIONS,
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

export const getCompetition = (_id) => dispatch => {
    dispatch(setCompetitionsLoading());
    axios
        .get(`/api/competitions/${_id}`)
        .then(res => 
            dispatch({
                type: GET_COMPETITION,
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

export const addCompetition = (competition, history) => (dispatch) => {
    axios
        .post('/api/competitions', competition)
        .then(res => 
            dispatch({
                type: ADD_COMPETITION,
                payload: res.data           
            })
        )
        .then(res => history.push("/competitions")) 
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
        );
}

export const deleteCompetition = (_id) => (dispatch) => {
    axios
        .delete(`/api/competitions/${_id}`)
        .then(res =>
            dispatch({
                type: DELETE_COMPETITION,
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

export const setCompetitionsLoading = () => {
    return {
        type: COMPETITIONS_LOADING
    }
}