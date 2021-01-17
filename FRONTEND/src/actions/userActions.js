import axios from "axios";
import { CLEAR_USERS, GET_USERS, GET_USER } from "./types";

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


export const getUserById = (user_id) => dispatch => {
    axios.get(`http://localhost:5000/api/users/${user_id}`)
        .then(res => dispatch({ type: GET_USER, payload: res.user }))
        .catch(err => dispatch({ type: CLEAR_USERS, payload: {} }))
}