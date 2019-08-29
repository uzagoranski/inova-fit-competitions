"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
    rounds: [],
    loading: false
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.GET_ROUNDS:
            return Object.assign({}, state, { rounds: action.payload, loading: false });
        case types_1.DELETE_ROUND:
            return Object.assign({}, state, { rounds: state.rounds.filter(round => round._id !== action.payload) });
        case types_1.ADD_ROUND:
            return Object.assign({}, state, { rounds: [action.payload, ...state.rounds] });
        case types_1.ROUNDS_LOADING:
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=roundReducer.js.map