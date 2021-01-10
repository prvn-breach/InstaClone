import { GET_POSTS, GET_POST, CLEAR_POSTS } from "../actions/types";
import isEmpty from "../validation/is_empty";

const initialState = {
    loading: true,
    posts: [],
    post: {}
}

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                loading: isEmpty(action.payload),
                posts: action.payload
            }

        case GET_POST:
            return {
                ...state,
                post: action.payload
            }

        case CLEAR_POSTS:
            return {}
            
        default:
            return state
    }
}