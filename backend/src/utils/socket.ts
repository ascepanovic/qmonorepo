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
  findGameDataByUserId,
  getPlayersScore,
} from "../services/game.service";
import { findAnswerById } from "../services/answer.service";
import { getRandomQuestion } from "../services/question.service";
import { checkUserGameStatus, getUserPoints } from "../services/user.service";

dotenv.config();
let currentQuestionNumber = 0;
const maxQuestions = process.env.MAX_QUESTIONS || 4;
const maxPlayers = process.env.MAX_PLAYERS || 2;
const gameDuration = parseInt(`${process.env.GAME_DURATION}`) || 60;
const questionTimer = parseInt(`${process.env.QUESTION_TIMER}`) || 5;

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
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      socket.on("createGame", async (payload) => {
        try {
          const { userId, categoryId } = payload;

          const userGameStatus = await checkUserGameStatus(userId);

          if (userGameStatus) {
            return socket.emit("joinGameError", "Player is already in a game");
          }
          const game = await create(socket.id, +categoryId, +userId);

          startTimer(gameDuration, async () => {
            await endGame(game.id, game.socket_id, io);
          });

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
          const userGameStatus = await checkUserGameStatus(userId);
          if (userGameStatus) {
            return socket.emit("joinGameError", "Player is already in a game");
          }
          const game = await findById(gameId);
          if (game && game.game_status === GameStatus.Waiting) {
            await assignToGame(gameId, userId);

            socket.join(game.socket_id);
            io.to(game.socket_id).emit("playerJoined ", userId);

            const players = await getPlayersInGame(gameId);
            const categoryId = await findCategoryIdByGame(gameId);
            if (players.length === +maxPlayers && categoryId) {
              await update(gameId, GameStatus.Active);
              const question = await getRandomQuestion(+categoryId);

              if (question) {
                currentQuestionNumber = 1;
                io.to(game.socket_id).emit("gameStarted", question);
                io.to(game.socket_id).emit("playersInGame", players);

                startTimer(questionTimer, async () => {
                  io.to(game.socket_id).emit("fistQuestionTimerExpired");
                });
              }
            }
          }
        } catch (error) {
          console.error(`Failed to join room: ${error}`);
        }
      });

      socket.on("answer", async (userId: number, answerId: number) => {
        try {
          const { gameId, socketId, categoryId } = await findGameDataByUserId(
            userId
          );
          if (gameId && socketId && categoryId) {
            const question = await getRandomQuestion(categoryId);
            const answer = await findAnswerById(answerId);
            if (question && answer?.is_correct === true) {
              await updateScore(gameId, userId, true);
              io.to(socketId).emit("answerResult", {
                userId,
                isCorrect: true,
              });
            }

            if (question) {
              currentQuestionNumber++;
              io.to(socketId).emit("nextQuestion", question);

              startTimer(questionTimer, async () => {
                io.to(socketId).emit("questionTimerExpired");

                if (currentQuestionNumber >= +maxQuestions) {
                  endGame(gameId, socketId, io);
                }
              });
            }
          }
        } catch (error) {
          console.error(`Failed to process answer: ${error}`);
        }
      });

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
        clearTimeout(gameTimer);
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  });
}

let timer: NodeJS.Timeout;
let gameTimer: NodeJS.Timeout;

function startTimer(duration: number, callback: () => void) {
  clearTimeout(timer);
  timer = setTimeout(callback, duration * 1000);
}

async function endGame(gameId: number, socketId: string, io: any) {
  currentQuestionNumber = 0;
  await update(gameId, GameStatus.Finished);
  clearTimeout(timer);
  const playersScore = await getPlayersScore(gameId);
  io.to(socketId).emit("scoreBoard", playersScore);
  io.to(socketId).emit("gameEnded");
}
