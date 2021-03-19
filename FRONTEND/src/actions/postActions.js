import axios from "axios";
import { 
    GET_POSTS,
    CLEAR_POSTS,
    GET_POST,
    GET_ERRORS
} from "./types";

export const createPost = (newPost) => dispatch => {
    const formData = new FormData();
    formData.append('text', newPost['text']);
    formData.append('image', newPost['image']);

    axios.post('http://localhost:5000/api/posts', formData)
        .then(post => 
            dispatch({
                type: GET_POST,
                payload: post.data
            })
        )
        .catch(err => 
            dispatch({
                type: CLEAR_POSTS,
                payload: {}
            })
        )
}

export const deletePost = (id) => dispatch => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
        .then(post => {})
        .catch(err => 
            dispatch({
                type: CLEAR_POSTS,
                payload: {}
            })
        )
}

export const getPosts = () => dispatch => {
    axios.get('http://localhost:5000/api/posts')
        .then(posts => 
            dispatch({
                type: GET_POSTS,
                payload: posts.data
            })
        )
        .catch(err => 
            dispatch({
                type: CLEAR_POSTS,
                payload: {}
            })
        )
}

export const likePost = (id) => dispatch => {
    axios.post(`http://localhost:5000/api/posts/like/${id}`)
        .then(post => 
            dispatch({
                type: GET_POST,
                payload: post.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const unLikePost = (id) => dispatch => {
    axios.post(`http://localhost:5000/api/posts/unlike/${id}`)
        .then(post => 
            dispatch({
                type: GET_POST,
                payload: post.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const createComment = (comment, id) => dispatch => {
    axios.post(`http://localhost:5000/api/posts/comment/${id}`, { text: comment } )
        .then(post => 
            dispatch({
                type: GET_POST,
                payload: post.data
            })
        )
        .catch(err => 
            dispatch({
                type: CLEAR_POSTS,
                payload: {}
            })
        )
}