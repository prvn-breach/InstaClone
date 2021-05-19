import socketIO from "socket.io-client";
import { SOCKET_URL } from "../config";
import queryString from "query-string";

export default (user_id) => {
    return socketIO(SOCKET_URL, { query: queryString.stringify({ user: user_id }) });
}