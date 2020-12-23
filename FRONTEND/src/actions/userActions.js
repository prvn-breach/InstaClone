import axios from "axios";
import { CLEAR_USERS, GET_USERS } from "./types";

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