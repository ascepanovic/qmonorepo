import { UserT } from ".";

export interface GameT {
  id: number;
  socket_id: string;
  created_by: number;
  game_status: string;
  created_at: string;
}

export interface WaitingGameT {
  id: string;
  category: string;
  playerCount: number;
}

export interface GameHistoryT {
  question: string;
  answers: string[];
  is_correct: number[];
  names: string[];
}

export interface GameResultT {
  points: number;
  user: UserT;
  won: boolean;
}
