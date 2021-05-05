import { ADD_USER_TO_CHAT, DELETE_MESSAGE, GET_USER_CONVERSATION, REMOVE_USER_FROM_CHAT, SENT_MESSAGE } from "../actions/types";

const initialState = {
    conversation: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_CONVERSATION:
            return {
                conversation: action.payload
            };
        case ADD_USER_TO_CHAT:
            return {
                conversation: {
                    ...state.conversation,
                    conversation_users: state.conversation_users.push(action.payload)
                }
            }
        case REMOVE_USER_FROM_CHAT:
            return {
                conversation: {
                    ...state.conversation,
                    conversation_users: state.conversation_users.filter(user => user.receiver_id != action.payload)
                }
            };
        case SENT_MESSAGE:
            return {
                conversation: {
                    ...state.conversation,
                    messages: state.messages.push(action.payload)
                }
            }
        case DELETE_MESSAGE:
            return {
                conversation: {
                    ...state.conversation,
                    messages: state.messages.filter(message => message._id!=action.payload)
                }
            };
        default:
            return state;
    }
}