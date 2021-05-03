import { GET_USERS, GET_SUGGESTIONS, GET_USER, LOADING } from "../actions/types";

const initialState = {
    loading: true,
    users: [],
    user: {},
    suggestions: []
}

export default function (state=initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case GET_USERS:
            return {
                ...state, 
                loading: false,
                users: action.payload
            }
        case GET_SUGGESTIONS:
            return {
                ...state,
                loading: false,
                suggestions: action.payload
            }
        default:
            return state;
    }
}