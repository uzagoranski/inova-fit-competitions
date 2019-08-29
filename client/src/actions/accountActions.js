import axios from 'axios';
import { GET_USER, GET_ERRORS, USER_LOADING } from './types';

export const getUser = (_id) => async(dispatch) => {
    
    try {

        dispatch(setUserLoading());

        let res = await axios.get(`/api/users/${_id}`);

        dispatch({
            type: GET_USER,
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