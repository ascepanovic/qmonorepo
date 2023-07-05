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
  getPlayersScore,
} from "../services/game.service";
import { findAnswerById, userAnswer } from "../services/answer.service";
import { getQuestionsByCategoryId } from "../services/question.service";
import { checkUserGameStatus, getUserPoints } from "../services/user.service";
import { log } from "console";

dotenv.config();

let timer: NodeJS.Timeout;
let gameTimer: NodeJS.Timeout;

const maxPlayers = process.env.MAX_PLAYERS || 2;
const gameDuration = parseInt(`${process.env.GAME_DURATION}`) || 60 * 1000;
const questionTime = parseInt(`${process.env.QUESTION_TIMER}`) || 5 * 1000;
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
        const userGameStatus = await checkUserGameStatus(userId);
        if (userGameStatus) {
          return socket.emit("joinGameError", "Player is already in a game");
        }
        const gameRoom = `gameRoom_${Date.now()}`;
        const game = await create(gameRoom, +categoryId, +userId);

        gameTimer = setTimeout(async () => {
          await update(game.id, GameStatus.Finished);
        }, gameDuration);
        socket.join(game.socket_id);

        socket.emit("gameCreated", game.socket_id);
      } catch (error) {
        console.error(`Failed to create game: ${error}`);
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

          io.to(game.socket_id).emit("playerJoined", userId);

          const players = await getPlayersInGame(gameId);
          const categoryId = await findCategoryIdByGame(gameId);
          if (players.length === +maxPlayers && categoryId) {
            await update(gameId, GameStatus.Active);
            clearTimeout(gameTimer);
            io.to(game.socket_id).emit("gameStartCountdown");
            io.to(game.socket_id).emit("playersInGame", players);

            await handleQuestions(
              game.socket_id,
              categoryId,
              gameId,
              io,
              socket
            );
          }
        }
      } catch (error) {
        console.error(`Failed to join room: ${error}`);
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

const handleQuestions = async (
  socketId: string,
  categoryId: number,
  gameId: number,
  io: any,
  socket: any
) => {
  let currentQuestionNumber = 0;
  let isAnswered = false;
  let answerTimer: NodeJS.Timeout;
  let questionTimer: NodeJS.Timeout;

  const questions = await getQuestionsByCategoryId(categoryId);
  if (questions) {
    const askQuestion = async (question: any) => {
      currentQuestionNumber++;
      console.log("current Question :", currentQuestionNumber);
      isAnswered = false;

      questionTimer = setTimeout(() => {
        io.to(socketId).emit("nextQuestion", {
          question,
          currentQuestionNumber,
        });
        answerTimer = setTimeout(async () => {
          io.to(socketId).emit("questionTimerExpired");
          await handleAnswer(null, null);
        }, questionTime);
      }, questionTime);

      socket.on("answer", async (userId: number, answerId: number) => {
        console.log("ANSWER", userId, answerId);
        clearTimeout(answerTimer);
        clearTimeout(questionTimer);
        await handleAnswer(userId, answerId);
      });
    };
    const handleAnswer = async (
      userId: number | null,
      answerId: number | null
    ) => {
      isAnswered = true;
      if (userId !== null && answerId !== null) {
        const isCorrect = await findAnswerById(answerId);
        await userAnswer(answerId, isCorrect, gameId, userId);
        await updateScore(gameId, userId, isCorrect);

        io.to(socketId).emit("answerResult", {
          userId,
          isCorrect,
        });
      }
      if (currentQuestionNumber < questions.length) {
        await askQuestion(questions[currentQuestionNumber]);
      } else {
        await endGame(gameId, socketId, io);
      }
    };
    await askQuestion(questions[currentQuestionNumber]);
  }
};

function startTimer(duration: number, callback: () => void) {
  clearTimeout(timer);
  timer = setTimeout(callback, duration);
}

async function endGame(gameId: number, socketId: string, io: any) {
  await update(gameId, GameStatus.Finished);
  const playersScore = await getPlayersScore(gameId);

  io.to(socketId).emit("scoreBoard", playersScore);
  io.to(socketId).emit("gameEnded");
}
