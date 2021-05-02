import axios from "axios";
import queryString from "query-string";

import { CLEAR_USERS, GET_USERS, GET_USER, GET_SUGGESTIONS, GET_ERRORS } from "./types";

export const getUsers = () => dispatch => {
    axios.get('http://localhost:5000/api/users')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data.users
            })
        )
        .catch(err =>
            dispatch({
                type: CLEAR_USERS,
                payload: {}
            })
        )
}

export const getUsersByFilter = (filters) => dispatch => {
    const stringified = queryString.stringify(filters);
    axios.get(`http://localhost:5000/api/get-users-by-filter?${stringified}`)
        .then(res => dispatch({ type: GET_USER, payload: res.data.users[0] }))
}

export const getSuggestions = () => dispatch => {
    axios.get('http://localhost:5000/api/user/suggestions')
        .then(res =>
            dispatch({
                type: GET_SUGGESTIONS,
                payload: res.data.data.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const followUser = (user_id) => dispatch => {
    axios.post('http://localhost:5000/api/users/follow', { user_id: user_id })
        // .then(() =>
        //     dispatch({
        //         type: GET_SUGGESTIONS,
        //         payload: res.data.data.data
        //     })
        // )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const unfollowUser = (user_id) => dispatch => {
    axios.post('http://localhost:5000/api/users/unfollow', { user_id: user_id })
        // .then(res =>
        //     dispatch({
        //         type: GET_SUGGESTIONS,
        //         payload: res.data.data.data
        //     })
        // )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}