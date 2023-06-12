import dotenv from "dotenv";
import { Server } from "socket.io";
import {
  GameStatus,
  assignToGame,
  create,
  update,
  findById,
  getPlayersInGame,
  getWaitingGames,
  updateScore,
  findCategoryIdByGame,
} from "../services/game.service";
import { findAnswerById } from "../services/answer.service";
import { getRandomQuestion } from "../services/question.service";
import { getUserPoints } from "../services/user.service";

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

    socket.on("createGame", async (payload) => {
      try {
        const { userId, categoryId } = payload;
        const game = await create(socket.id, +categoryId, +userId);
        socket.join(game.socket_id);
        socket.emit("gameCreated", game.socket_id);
      } catch (error) {
        console.error(`Failed to create game: ${error}`);
      }
    });

    socket.on("getWaitingGames", async () => {
      try {
        const waitingGames = await getWaitingGames();
        socket.emit("waitingGames", waitingGames);
      } catch (error) {
        console.error(`Failed to get waiting games: ${error}`);
      }
    });

    socket.on("joinGame", async (gameId: number, userId: number) => {
      try {
        const game = await findById(gameId);
        if (game && game.game_status === "WAITING") {
          await assignToGame(gameId, userId);

          socket.join(game.socket_id);
          io.to(game.socket_id).emit("playerJoined ", userId);

          const players = await getPlayersInGame(gameId);
          const categoryId = await findCategoryIdByGame(gameId);
          if (players.length === 4 && categoryId) {
            await update(gameId, GameStatus.ACTIVE);
            const question = await getRandomQuestion(+categoryId);

            if (question) {
              io.to(game.socket_id).emit("gameStarted", question.text);

              startTimer(10, () => {
                io.to(game.socket_id).emit("timerExpired");
              });
            }
          }
        }
      } catch (error) {
        console.error(`Failed to join room: ${error}`);
      }
    });

    socket.on(
      "answer",
      async (gameId: number, userId: number, answerId: number) => {
        try {
          const game = await findById(gameId);
          const categoryId = await findCategoryIdByGame(gameId);
          if (game && game.game_status === "ACTIVE" && categoryId) {
            const question = await getRandomQuestion(categoryId);
            const answer = await findAnswerById(answerId);
            if (question && answer?.is_correct === true) {
              await updateScore(gameId, userId, true);
              io.to(game.socket_id).emit("answerResult", {
                userId,
                isCorrect: true,
              });
            } else {
              await updateScore(gameId, userId, false);
              io.to(game.socket_id).emit("answerResult", {
                userId,
                isCorrect: false,
              });
            }

            if (question) {
              io.to(game.socket_id).emit("nextQuestion", question.text);

              startTimer(10, () => {
                io.to(game.socket_id).emit("timerExpired");
              });
            }
          }
        } catch (error) {
          console.error(`Failed to process answer: ${error}`);
        }
      }
    );
    socket.on("getOnlineUsers", () => {
      const onlineUsersCount = Object.keys(io.sockets.sockets).length;
      socket.emit("onlineUsersCount", onlineUsersCount);
    });
    socket.on("getUserPoints", async (userId) => {
      try {
        const userPoints = await getUserPoints(userId);
        socket.emit("userPoints", userPoints);
      } catch (error) {
        console.error(`Failed to get user points: ${error}`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}
function startTimer(duration: number, callback: () => void) {
  const timer = setTimeout(callback, duration * 1000);
}
