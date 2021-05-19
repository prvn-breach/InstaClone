import { GET_POSTS, GET_POST, CLEAR_POSTS, CREATE_POST, DELETE_POST, LIKE_POST, UNLIKE_POST, COMMENT_POST, GET_POSTS_LOADING, CREATE_POST_LOADING, DELETE_POST_LOADING, LIKE_POST_LOADING, UNLIKE_POST_LOADING, COMMENT_POST_LOADING } from "../actions/types";

const initialState = {
    getPostsLoading: false,
    createPostLoading: false,
    likePostLoading: false,
    unlikePostLoading: false,
    commentPostLoading: false,
    deletePostLoading: false,
    posts: [],
    post: {}
}

export default (state = initialState, action) => {
    let index;
    switch (action.type) {
        case GET_POSTS_LOADING:
            return { ...state, getPostsLoading: true };

        case CREATE_POST_LOADING:
            return { ...state, createPostLoading: true };

        case DELETE_POST_LOADING:
            return { ...state, deletePostLoading: true };

        case LIKE_POST_LOADING:
            return { ...state, likePostLoading: true };

        case UNLIKE_POST_LOADING:
            return { ...state, unlikePostLoading: true };

        case COMMENT_POST_LOADING:
            return { ...state, commentPostLoading: true };

        case GET_POSTS:
            return { ...state, getPostsLoading: false, posts: action.payload };

        case CREATE_POST:
            return { ...state, createPostLoading: false, posts: [...state.posts, action.payload] };

        case DELETE_POST:
            return { ...state, deletePostLoading: false, posts: state.posts.filter(post => post._id != action.payload) };

        case LIKE_POST:
            index = state.posts.findIndex(post => post._id === action.payload['post_id']);
            state.posts[index]['likes'].unshift({ user: action.payload['user_id'] });
            return { ...state, likePostLoading: false };

        case UNLIKE_POST:
            index = state.posts.findIndex(post => post._id === action.payload['post_id']);
            let removeIndex = state.posts[index]['likes'].findIndex(like => like.user === action.payload['user_id']);
            state.posts[index]['likes'].splice(removeIndex, 1);
            return { ...state, unlikePostLoading: false };

        case COMMENT_POST:
            index = state.posts.findIndex(post => post._id === action.payload['post_id']);
            state.posts[index]['comments'].unshift(action.payload['comment']);
            return { ...state, commentPostLoading: false };

        case GET_POST:
            return { ...state, post: action.payload };

        case CLEAR_POSTS:
            return state;

        default:
            return state
    }
}