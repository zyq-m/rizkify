import { io } from "socket.io-client";
import { BASE_URL } from "./axios";

export const socket = io(BASE_URL);
