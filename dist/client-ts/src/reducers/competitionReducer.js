"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
    competitions: [],
    loading: false
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.GET_COMPETITIONS:
            return Object.assign({}, state, { competitions: action.payload, loading: false });
        case types_1.GET_COMPETITION:
            return Object.assign({}, state, { competitions: action.payload, loading: false });
        case types_1.DELETE_COMPETITION:
            return Object.assign({}, state, { competitions: state.competitions.filter(competition => competition._id !== action.payload) });
        case types_1.ADD_COMPETITION:
            return Object.assign({}, state, { competitions: [action.payload, ...state.competitions] });
        case types_1.COMPETITIONS_LOADING:
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=competitionReducer.js.map