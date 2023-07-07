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
  getGameHistory,
} from "../services/game.service";
import { findAnswerById, userAnswer } from "../services/answer.service";
import { getQuestionsByCategoryId } from "../services/question.service";
import { checkUserGameStatus, getUserPoints } from "../services/user.service";
dotenv.config();
const maxPlayers = process.env.MAX_PLAYERS || 2;
const gameDuration = parseInt(`${process.env.GAME_DURATION}`) || 60;
const questionTimer = parseInt(`${process.env.QUESTION_TIMER}`) || 5;

let currentQuestionIndex;
let maxQuestions = parseInt(`${process.env.MAX_QUESTIONS}`) || 5;

let isAnswered = false;

export function initializeSocketIO(server: any) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let timer: NodeJS.Timeout;
  let gameTimer: NodeJS.Timeout;
  let currentQuestionIndex = 0;

  function startTimer(duration: number, callback: () => void) {
    clearTimeout(timer);
    timer = setTimeout(callback, duration * 1000);
  }

  async function endGame(gameId: number, socketId: string, io: any) {
    currentQuestionIndex = 0;
    await update(gameId, GameStatus.Finished);
    const playersScore = await getPlayersScore(gameId);
    startTimer(questionTimer, async () => {
      io.to(socketId).emit("scoreBoard", playersScore);
      io.to(socketId).emit("gameEnded");
    });
  }
  let questionTime: NodeJS.Timeout;
  let answerTime: NodeJS.Timeout;

  const sendQuestion = async (socketId: string, gameId: number) => {
    try {
      const categoryId = await findCategoryIdByGame(gameId);
      if (currentQuestionIndex < maxQuestions && categoryId) {
        const questions = await getQuestionsByCategoryId(categoryId);
        if (questions && questions.length > currentQuestionIndex) {
          const question = questions[currentQuestionIndex];

          questionTime = setTimeout(() => {
            io.to(socketId).emit("nextQuestion", {
              question,
              currentQuestionIndex,
            });
            currentQuestionIndex++;
            isAnswered = false;
            answerTime = setTimeout(async () => {
              io.to(socketId).emit("questionTimerExpired");
              sendQuestion(socketId, gameId);
            }, questionTimer * 1000);
          }, questionTimer * 1000);
        }
      } else {
        io.to(socketId).emit("noMoreQuestions");

        endGame(gameId, socketId, io);
      }
    } catch (error) {
      console.error(`Failed to send question: ${error}`);
    }
  };

  io.on("connection", (socket) => {
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
    socket.on("gameAnswers", async (gameId: number) => {
      try {
        const gameHistory = await getGameHistory(gameId);
        socket.emit("gameHistory", gameHistory);
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
            currentQuestionIndex = 0;
            io.to(game.socket_id).emit("gameStartCountdown");
            io.to(game.socket_id).emit("playersInGame", players);

            sendQuestion(game.socket_id, game.id);
          }
        }
      } catch (error) {
        console.error(`Failed to join room: ${error}`);
      }
    });

    socket.on("answer", async (userId: number, answerId: number) => {
      try {
        if (isAnswered) return;
        const { socketId, gameId } = await findGameDataByUserId(userId);
        const answerData = await findAnswerById(answerId);

        if (gameId && socketId && answerData) {
          if (answerData.isCorrect) {
            isAnswered = true;
            clearTimeout(answerTime);
            clearTimeout(questionTime);
            io.to(socketId).emit("answerResult", { userId });

            console.log("Correct answer ", userId, answerId);
            await userAnswer(
              answerData.question,
              answerData.answer,
              answerData.isCorrect,
              gameId,
              userId
            );
            await updateScore(gameId, userId, answerData.isCorrect);
            sendQuestion(socketId, gameId);
          } else {
            console.log("Wrong answer ", userId, answerId);
            await userAnswer(
              answerData.question,
              answerData.answer,
              answerData.isCorrect,
              gameId,
              userId
            );
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
}
