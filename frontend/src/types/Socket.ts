import { QuestionT, UserT, WaitingGameT } from ".";

export interface ServerToClientEvents {
  gameCreated: (gameId: string) => void;
  waitingGames: (games: WaitingGameT[]) => void;
  playerJoined: (userId: number) => void;
  gameStarted: (question: QuestionT) => void;
  timerExpired: () => void;
  answerResult: (result: { userId: number; isCorrect: boolean }) => void;
  nextQuestion: (question: QuestionT) => void;
  joinGameError: (errorMessage: string) => void;
  onlineUsersCount: (count: number) => void;
  userPoints: (points: number) => void;
  gameEnded: () => void;
  playersInGame: (players: UserT[]) => void;
}

export interface ClientToServerEvents {
  createGame: (payload: { userId: number; categoryId: number }) => void;
  getWaitingGames: () => void;
  joinGame: (gameId: number, userId: number) => void;
  answer: (userId: number, answerId: number) => void;
  getOnlineUsers: () => void;
  getUserPoints: (userId: number) => void;
  disconnect: () => void;
}
