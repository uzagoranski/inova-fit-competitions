"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
exports.getCompetitions = () => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        dispatch(exports.setCompetitionsLoading());
        let res = yield axios_1.default.get('/api/competitions');
        dispatch({
            type: types_1.GET_COMPETITIONS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    }
});
exports.getCompetition = (_id) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        dispatch(exports.setCompetitionsLoading());
        let res = yield axios_1.default.get(`/api/competitions/${_id}`);
        dispatch({
            type: types_1.GET_COMPETITION,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    }
});
exports.addCompetition = (competition, history) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        let res = yield axios_1.default.post('/api/competitions', competition);
        dispatch({
            type: types_1.ADD_COMPETITION,
            payload: res.data
        });
        history.push("/competitions");
    }
    catch (err) {
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    }
});
exports.deleteCompetition = (_id) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield axios_1.default.delete(`/api/competitions/${_id}`);
        dispatch({
            type: types_1.DELETE_COMPETITION,
            payload: _id
        });
    }
    catch (err) {
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    }
});
exports.setCompetitionsLoading = () => {
    return {
        type: types_1.COMPETITIONS_LOADING
    };
};
//# sourceMappingURL=competitionActions.js.map