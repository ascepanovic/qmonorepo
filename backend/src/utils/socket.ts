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
import { findAnswerById, userAnswer } from "../services/answer.service";
import { getQuestionsByCategoryId } from "../services/question.service";
import { checkUserGameStatus, getUserPoints } from "../services/user.service";
dotenv.config();

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
    socket.on("createGame", async (payload) => {
      try {
        const { userId, categoryId } = payload;
        const userGameStatus = await checkUserGameStatus(userId);
        if (userGameStatus) {
          return socket.emit("joinGameError", "Player is already in a game");
        }
        const game = await create(socket.id, +categoryId, +userId);
        gameTimer = setTimeout(async () => {
          await update(game.id, GameStatus.Finished);
        }, gameDuration * 1000);
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
            clearTimeout(gameTimer);
            io.to(game.socket_id).emit("gameStartCountdown");
            io.to(game.socket_id).emit("playersInGame", players);
            await handleQuestions(
              game.socket_id,
              categoryId,
              game.id,
              io,
              socket
            );
          }
        }
      } catch (error) {
        console.error(`Failed to join room: ${error}`);
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
}
let timer: NodeJS.Timeout;
let gameTimer: NodeJS.Timeout;
function startTimer(duration: number, callback: () => void) {
  clearTimeout(timer);
  timer = setTimeout(callback, duration * 1000);
}
async function endGame(gameId: number, socketId: string, io: any) {
  await update(gameId, GameStatus.Finished);
  const playersScore = await getPlayersScore(gameId);
  startTimer(questionTimer, async () => {
    io.to(socketId).emit("scoreBoard", playersScore);
    io.to(socketId).emit("gameEnded");
  });
}
//////////////////////
const handleQuestions = async (
  socketId: string,
  categoryId: number,
  gameId: number,
  io: any,
  socket: any
) => {
  let currentQuestionNumber = 0;
  let isAnswered = false;
  const questions = await getQuestionsByCategoryId(categoryId);

  if (questions) {
    const askQuestion = async (question: any) => {
      currentQuestionNumber++;
      isAnswered = false;
      io.to(socketId).emit("nextQuestion", {
        question,
        currentQuestionNumber,
      });

      const questionTimerExpired = new Promise<void>((resolve) => {
        setTimeout(() => {
          if (!isAnswered) {
            io.to(socketId).emit("questionTimerExpired");
            resolve();
          }
        }, questionTimer);
      });

      await questionTimerExpired;

      if (currentQuestionNumber < questions.length) {
        await askQuestion(questions[currentQuestionNumber]);
      } else {
        await endGame(gameId, socketId, io);
      }
    };

    socket.on("answer", async (userId: number, answerId: number) => {
      await handleAnswer(userId, answerId);
    });

    const handleAnswer = async (
      userId: number | null,
      answerId: number | null
    ) => {
      isAnswered = true;
      clearTimeout(questionTimer);

      if (userId !== null && answerId !== null) {
        const isCorrect = await findAnswerById(answerId);
        await userAnswer(answerId, isCorrect, gameId, userId);
        await updateScore(gameId, userId, isCorrect);
        io.to(socketId).emit("answerResult", {
          userId,
          isCorrect,
        });
      }
    };

    await askQuestion(questions[currentQuestionNumber]);
  }
};
