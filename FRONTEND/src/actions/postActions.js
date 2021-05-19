import axios from "axios";
import {
    GET_POSTS,
    CREATE_POST,
    DELETE_POST,
    LIKE_POST,
    UNLIKE_POST,
    GET_POSTS_LOADING,
    CREATE_POST_LOADING,
    DELETE_POST_LOADING,
    LIKE_POST_LOADING,
    UNLIKE_POST_LOADING,
    COMMENT_POST_LOADING,
    COMMENT_POST
} from "./types";

export const getPosts = () => async dispatch => {
    dispatch({ type: GET_POSTS_LOADING });
    let response = await axios.get('http://localhost:5000/api/posts')
    dispatch({ type: GET_POSTS, payload: response['data']['data'] });
}

export const createPost = (newPost) => async dispatch => {
    dispatch({ type: CREATE_POST_LOADING });
    let formData = new FormData;
    formData.append('text', newPost['text']);
    formData.append('image', newPost['image']);

    let response = await axios.post('http://localhost:5000/api/posts', formData);
    dispatch({ type: CREATE_POST, payload: response['data']['data'] })
}

export const deletePost = (id) => async dispatch => {
    dispatch({ type: DELETE_POST_LOADING });
    let response = await axios.delete(`http://localhost:5000/api/posts/${id}`)
    dispatch({ type: DELETE_POST, payload: response['data']['data'] });
}

export const likePost = (id) => async dispatch => {
    dispatch({ type: LIKE_POST_LOADING });
    let response = await axios.post(`http://localhost:5000/api/posts/like/${id}`)
    dispatch({ type: LIKE_POST, payload: response['data']['data'] });
}

export const unLikePost = (id) => async dispatch => {
    dispatch({ type: UNLIKE_POST_LOADING });
    let response = await axios.post(`http://localhost:5000/api/posts/unlike/${id}`)
    dispatch({ type: UNLIKE_POST, payload: response['data']['data'] });
}

export const createComment = (comment, id) => async dispatch => {
    dispatch({ type: COMMENT_POST_LOADING });
    let response = await axios.post('http://localhost:5000/api/posts/comment', { post_id: id, text: comment })
    dispatch({ type: COMMENT_POST, payload: response['data']['data'] });
}