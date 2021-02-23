import { GET_USERS } from "../actions/types";

const initialState = {
    loading: true,
    users: [],
    user: {}
}

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                loading: false,
                users: action.payload
            }
        default:
            return state;
    }
}