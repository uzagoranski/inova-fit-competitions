import { GET_USER, USER_LOADING } from '../actions/types';
import { IReducerAction } from '../../common/interfaces';

const initialState = {
    users: [],
    loading: false
}

export default function(state = initialState, action: IReducerAction) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                users: action.payload,
                loading: false
            }        
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}