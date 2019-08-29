import { GET_ERRORS } from './types';

export const returnErrors = (msg: string, status: number, id: string = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}