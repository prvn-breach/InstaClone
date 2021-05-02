import axios from "axios";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    RESET_PASSWORD_RESPONSE,
    CLEAR_ERRORS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";


// Register user
export const registerUser = (newUser) => dispatch => {
    axios.post('http://localhost:5000/api/register', newUser)
        .then((res) => { })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


// Login user
export const loginUser = (credentials) => dispatch => {
    axios.post('http://localhost:5000/api/login', credentials)
        .then((res) => {
            // Save to localStorage
            const { token, user } = res.data;

            // Set token header to auth
            setAuthToken(token);

            // Set token to ls
            localStorage.setItem('jwtToken', token);

            // Decode Token
            const decoded = jwt_decode(token);
            localStorage.setItem('instaUser', decoded['id']);

            // set current user
            dispatch(setCurrentUser(user));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Log out user
export const logoutUser = () => async dispatch => {
    let instaUser = localStorage['instaUser'];
    // console.log(instaUser);
    
    await axios.delete(`http://localhost:5000/api/user_status/${instaUser}`);

    // Remove Token from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('instaUser');
    // Remove Auth Header for future requests
    setAuthToken(false);
    // Set current to {}  which will set isAuthenticated false
    dispatch(setCurrentUser({}));
    // Redirect to login page
    window.location.replace("/login");
}

// Forget Password
export const forgetPassword = (email) => dispatch => {
    axios.post('http://localhost:5000/api/reset-password', { email: email })
        .then((res) =>
            dispatch({
                type: RESET_PASSWORD_RESPONSE,
                payload: res.data
            }),
            dispatch(clearErrors())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Change Password
export const changePassword = (newPwd) => dispatch => {
    axios.post('http://localhost:5000/api/change-password', newPwd)
        .then((res) =>
            dispatch({
                type: RESET_PASSWORD_RESPONSE,
                payload: res.data
            }),
            dispatch(clearErrors())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Update Set Current User
export const updateSetCurrentUser = (user_id) => dispatch => {
    axios.get(`http://localhost:5000/api/get-users-by-filter?id=${user_id}`)
        .then(res => dispatch(setCurrentUser(res.data.users[0])))
}


// Get Current User
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Clear Errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}