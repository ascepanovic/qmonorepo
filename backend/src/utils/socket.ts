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

            handleQuestions(game.socket_id, categoryId, game.id, io);
            // startTimer(questionTimer, async () => {
            //   io.to(game.socket_id).emit("gameStart");
            //   const question = await getRandomQuestion(+categoryId);
            //   if (question) {
            //     currentQuestionNumber = 1;
            //     io.to(game.socket_id).emit("nextQuestion", question);
            //     io.to(game.socket_id).emit("playersInGame", players);
            //     startTimer(questionTimer, async () => {
            //       io.to(game.socket_id).emit("questionTimerExpired");
            //       io.to(game.socket_id).emit("answerResult", {
            //         userId,
            //         isCorrect: false,
            //       });
            //     });
            //   }
            // });
          }
        }
      } catch (error) {
        console.error(`Failed to join room: ${error}`);
      }
    });
    // socket.on("answer", async (userId: number, answerId: number) => {
    //   try {
    //     const { gameId, socketId, categoryId } = await findGameDataByUserId(
    //       userId
    //     );
    //     if (gameId && socketId && categoryId) {
    //       const question = await getRandomQuestion(categoryId);
    //       const answer = await findAnswerById(answerId);
    //       if (question && answer?.is_correct === true) {
    //         await updateScore(gameId, userId, true);
    //         io.to(socketId).emit("answerResult", {
    //           userId,
    //           isCorrect: true,
    //         });
    //       } else {
    //         await updateScore(gameId, userId, false);
    //         io.to(socketId).emit("answerResult", {
    //           userId,
    //           isCorrect: false,
    //         });
    //       }
    //       if (question) {
    //         currentQuestionNumber++;
    //         startTimer(questionTimer, () => {
    //           io.to(socketId).emit("nextQuestion", question);
    //         });
    //         startTimer(questionTimer, async () => {
    //           io.to(socketId).emit("questionTimerExpired");
    //           io.to(socketId).emit("answerResult", {
    //             userId,
    //             isCorrect: false,
    //           });

    //           if (currentQuestionNumber >= +maxQuestions) {
    //             endGame(gameId, socketId, io);
    //           }
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     console.error(`Failed to process answer: ${error}`);
    //   }
    // });
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
  io: any
) => {
  let currentQuestionNumber = 0;
  let isAnswered = false;
  const questions = await getQuestionsByCategoryId(categoryId);
  const questionDelay = 3000;

  if (questions) {
    const askQuestion = (question: any) => {
      currentQuestionNumber++;
      isAnswered = false;
      io.to(socketId).emit("nextQuestion", {
        question,
        currentQuestionNumber,
      });

      setTimeout(() => {
        if (!isAnswered) {
          io.to(socketId).emit("questionTimerExpired");
          handleAnswer(null, null);
        }
      }, questionDelay);
    };

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

      if (currentQuestionNumber < questions.length) {
        setTimeout(() => {
          askQuestion(questions[currentQuestionNumber]);
        }, questionDelay);
      } else {
        endGame(gameId, socketId, io);
      }
    };

    io.on("answer", (userId: number, answerId: number) => {
      handleAnswer(userId, answerId);
    });

    setTimeout(() => {
      askQuestion(questions[currentQuestionNumber]);
    }, questionDelay);
  }
};
