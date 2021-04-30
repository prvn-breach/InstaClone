import socketIO from "socket.io-client";
import { SOCKET_URL } from "../config";

export const socket = socketIO(SOCKET_URL);