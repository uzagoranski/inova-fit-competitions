import axios from 'axios';
import { GET_ERRORS, REFRESH_TOKEN, USER_LOADING, CONNECT_STRAVA, DISCONNECT_STRAVA } from './types';

export const connectStrava = (_id, code) => dispatch => {
    dispatch(setUserLoading());
    axios
        .put(`/api/strava/${_id}/${code}`)
        .then(res => 
            dispatch({
                type: CONNECT_STRAVA,
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

export const disconnectStrava = (_id) => dispatch => {
    dispatch(setUserLoading());
    axios
    .put(`/api/strava/${_id}`)
    .then(res => 
            dispatch({
                type: DISCONNECT_STRAVA,
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

export const refreshToken = (_id, refresh_token) => dispatch => {
    dispatch(setUserLoading());
    axios
    .put(`/api/strava/refresh/${_id}/${refresh_token}`)
    .then(res => 
            dispatch({
                type: REFRESH_TOKEN,
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

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}