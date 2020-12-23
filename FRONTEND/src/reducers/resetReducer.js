import { RESET_PASSWORD_RESPONSE } from "../actions/types";

const initialState = {
    response: null
}

export default function (state=initialState, action) {
    switch (action.type) {
        case RESET_PASSWORD_RESPONSE:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state;
    }
}