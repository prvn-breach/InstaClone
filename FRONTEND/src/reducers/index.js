import { combineReducers } from "redux"; // Combine reducers which are accessed by globally
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import resetReducer from "./resetReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    reset: resetReducer,
    posts: postReducer,
    users: userReducer,
    chats: chatReducer
});