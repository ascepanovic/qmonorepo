import { Socket, io } from "socket.io-client";

import { ServerToClientEvents, ClientToServerEvents } from "@/types/Socket";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  (import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL) as string,
  {
    autoConnect: false,
    withCredentials: true,
  },
);
