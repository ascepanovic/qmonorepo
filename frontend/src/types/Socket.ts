import { QuestionT, UserT, WaitingGameT } from ".";

export interface ServerToClientEvents {
  gameCreated: (gameId: string) => void;
  waitingGames: (games: WaitingGameT[]) => void;
  playerJoined: (userId: number) => void;
  gameStarted: (question: QuestionT) => void;
  gameStartCountdown: () => void;
  timerExpired: () => void;
  answerResult: (result: { userId: number; isCorrect: boolean }) => void;
  nextQuestion: ({
    question,
    currentQuestionNumber,
    gameId,
  }: {
    question: {
      id: number;
      category_id: number;
      question_id: number;
      question: QuestionT;
    };
    currentQuestionNumber: number;
    gameId: string;
  }) => void;
  joinGameError: (errorMessage: string) => void;
  onlineUsersCount: (count: number) => void;
  userPoints: (points: number) => void;
  gameEnded: () => void;
  playersInGame: (players: UserT[]) => void;
  firstQuestionTimerExpired: () => void;
  questionTimerExpired: () => void;
  scoreBoard: (scores: any[]) => void;
}

export interface ClientToServerEvents {
  createGame: (payload: { userId: number; categoryId: number }) => void;
  getWaitingGames: () => void;
  joinGame: (gameId: string, userId: number) => void;
  answer: (userId: number, answerId: number) => void;
  getOnlineUsers: () => void;
  getUserPoints: (userId: number) => void;
  disconnect: () => void;
}
