import {
  GameHistoryT,
  GameResultT,
  NextQuestionT,
  QuestionT,
  UserT,
  WaitingGameT,
} from ".";

export interface ServerToClientEvents {
  gameCreated: (data: string) => void;
  waitingGames: (data: WaitingGameT[]) => void;
  playerJoined: (data: number) => void;
  gameStarted: (data: QuestionT) => void;
  gameStartCountdown: () => void;
  timerExpired: () => void;
  answerResult: (data: { userId: number }) => void;
  nextQuestion: (data: NextQuestionT) => void;
  joinGameError: (data: string) => void;
  onlineUsersCount: (data: number) => void;
  userPoints: (data: number) => void;
  gameEnded: () => void;
  playersInGame: (data: UserT[]) => void;
  firstQuestionTimerExpired: () => void;
  questionTimerExpired: () => void;
  scoreBoard: (data: GameResultT[]) => void;
  gameHistory: (data: GameHistoryT[]) => void;
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
