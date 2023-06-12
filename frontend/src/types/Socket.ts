export interface ServerToClientEvents {
  gameCreated: (game: any) => void;
  waitingGames: (games: any[]) => void;
  playerJoined: (userId: number) => void;
  gameStarted: (question: string) => void;
  timerExpired: () => void;
  answerResult: (result: { userId: number; isCorrect: boolean }) => void;
  nextQuestion: (question: string) => void;
}

export interface ClientToServerEvents {
  createGame: (payload: { userId: number; categoryId: number }) => void;
  getWaitingGames: () => void;
  joinGame: (gameId: number, userId: number) => void;
  answer: (gameId: number, userId: number, answerId: number) => void;
  disconnect: () => void;
}
