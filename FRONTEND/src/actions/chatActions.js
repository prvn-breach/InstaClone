import axios from "axios";
import { GET_USER_CONVERSATION, ADD_USER_TO_CHAT, REMOVE_USER_FROM_CHAT, SENT_MESSAGE, DELETE_MESSAGE } from "./types";

export const getUserConversation = () => {
    return async dispatch => {
        let response = await axios.get('http://localhost:5000/api/chats/get_conversation');
        if (!response['data']['error']) {
            dispatch({ type: GET_USER_CONVERSATION, payload: response['data']['data'] });
        }
    }
}

export const addUserToChat = (params) => {
    return async dispatch => {
        let response = await axios.post('http://localhost:5000/api/chats/add_user_to_chat', params);
        if (!response['data']['error']) {
            dispatch({ type: ADD_USER_TO_CHAT, payload: response['data']['data'] });
        }
    }
}

export const removeUserFromChat = (params) => {
    return async dispatch => {
        let response = await axios.post('http://localhost:5000/api/chats/remove_user_from_chat', params);
        if (!response['data']['error']) {
            dispatch({ type: REMOVE_USER_FROM_CHAT, payload: response['data']['data'] });
        }
    }
}

export const sentMessage = (params) => {
    return async dispatch => {
        let response = await axios.post('http://localhost:5000/api/chats/send_message', params);
        if (!response['data']['error']) {
            dispatch({ type: SENT_MESSAGE, payload: response['data']['data'] });
        }
    }
}

export const deleteMessage = (params) => {
    return async dispatch => {
        let response = await axios.post('http://localhost:5000/api/chats/delete_message', params);
        if (!response['data']['error']) {
            dispatch({ type: DELETE_MESSAGE, payload: response['data']['data'] });
        }
    }
}

