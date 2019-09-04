import axios from 'axios';
import { GET_ERRORS, REFRESH_TOKEN, USER_LOADING, CONNECT_STRAVA, DISCONNECT_STRAVA } from './types';
import { Dispatch } from 'redux';

export const connectStrava = (_id: string, code: string) => async(dispatch: Dispatch) => {

    try {

        dispatch(setUserLoading());
        
        let res = await axios.put(`/api/strava/${_id}/${code}`);

        dispatch({
            type: CONNECT_STRAVA,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const disconnectStrava = (_id: string) => async(dispatch: Dispatch) => {

    try {

        dispatch(setUserLoading());
        
        let res = await axios.put(`/api/strava/${_id}`);

        dispatch({
            type: DISCONNECT_STRAVA,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const refreshToken = (_id: string, refresh_token: string) => async(dispatch: Dispatch) => {

    try {

        dispatch(setUserLoading());

        let res = await axios.put(`/api/strava/refresh/${_id}/${refresh_token}`);

        dispatch({
            type: REFRESH_TOKEN,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const setUserLoading = () => {

    return {
        type: USER_LOADING
    }
}