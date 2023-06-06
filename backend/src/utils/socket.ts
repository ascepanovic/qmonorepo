import dotenv from "dotenv";
import { Server } from "socket.io";
import { create, findById, getPlayersInGame } from "../services/game.service";

dotenv.config();

export function initializeSocketIO(server: any) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("createRoom", async (payload) => {
      try {
        const { userId, categoryId } = payload;
        const game = await create(socket.id, categoryId, userId);
        if (game) {
          socket.emit("roomCreated", game);
        }
      } catch (error) {
        console.error(`Failed to create room: ${error}`);
      }
    });

    socket.on("joinRoom", async (gameId, userId) => {
      try {
        const game = await findById(gameId);
        if (game) {
          const players = await getPlayersInGame(gameId);
          const playerCount = players.length;

          if (playerCount < 4) {
            socket.join(`game_${gameId}`);
            socket.join(`user_${userId}`);
          } else {
            socket.emit("playerLimitReached");
          }
        }
      } catch (error) {
        console.error(`Failed to join room: ${error}`);
      }
    });

    socket.on("startGame", async (gameId) => {
      try {
        const game = await findById(gameId);
        if (game) {
          io.to(`game_${gameId}`).emit("gameStarted", game);
        }
      } catch (error) {
        console.error(`Failed to start game: ${error}`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}
