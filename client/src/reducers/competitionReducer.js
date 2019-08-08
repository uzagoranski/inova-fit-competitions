import { GET_COMPETITIONS, GET_COMPETITION, ADD_COMPETITION, DELETE_COMPETITION, COMPETITIONS_LOADING } from '../actions/types';

const initialState = {
    competitions: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_COMPETITIONS:
            return {
                ...state,
                competitions: action.payload,
                loading: false
            }
        case GET_COMPETITION:
            return {
                ...state,
                competitions: action.payload,
                loading: false
            }
        case DELETE_COMPETITION:
            return {
                ...state,
                competitions: state.competitions.filter(competition => competition._id !== action.payload)
            }
        case ADD_COMPETITION:
            return {
                ...state,
                competitions: [action.payload, ...state.competitions]
            }
        case COMPETITIONS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}