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
exports.getUser = (_id) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        dispatch(exports.setUserLoading());
        let res = yield axios_1.default.get(`/api/users/${_id}`);
        dispatch({
            type: types_1.GET_USER,
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
exports.setUserLoading = () => {
    return {
        type: types_1.USER_LOADING
    };
};
//# sourceMappingURL=accountActions.js.map