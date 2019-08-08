import { GET_ROUNDS, ADD_ROUND, DELETE_ROUND, ROUNDS_LOADING } from '../actions/types';

const initialState = {
    rounds: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ROUNDS:
            return {
                ...state,
                rounds: action.payload,
                loading: false
            }
        case DELETE_ROUND:
            return {
                ...state,
                rounds: state.rounds.filter(round => round._id !== action.payload)
            }
        case ADD_ROUND:
            return {
                ...state,
                rounds: [action.payload, ...state.rounds]
            }
        case ROUNDS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}