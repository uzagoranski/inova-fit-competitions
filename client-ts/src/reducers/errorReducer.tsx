import { GET_ERRORS } from "../actions/types";
import { IReducerAction } from "../../common/interfaces";

const initialState = {};

export default function(state = initialState, action: IReducerAction) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}