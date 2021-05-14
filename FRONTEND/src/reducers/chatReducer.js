import { ADD_USER_TO_CHAT, CHATS_LOADING, DELETE_MESSAGE, GET_USER_CONVERSATION, REMOVE_USER_FROM_CHAT, SENT_MESSAGE } from "../actions/types";

const initialState = {
    loading: false,
    conversation: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHATS_LOADING:
            return { ...state, loading: true };

        case GET_USER_CONVERSATION:
            return { ...state, loading: false, conversation: action.payload };

        case ADD_USER_TO_CHAT:
            state.conversation.conversation_users.push(action.payload);
            return state;

        case REMOVE_USER_FROM_CHAT:
            state.conversation.conversation_users = state.conversation_users.filter(user => user.receiver_id != action.payload);
            return state;

        case SENT_MESSAGE:
            state.conversation.messages.push(action.payload);
            return state;

        case DELETE_MESSAGE:
            state.conversation.messages = state.messages.filter(message => message._id != action.payload);
            return state;

        default:
            return state;
    }
}