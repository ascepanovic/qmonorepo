import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL as string, {
  autoConnect: false,
  withCredentials: true,
});
