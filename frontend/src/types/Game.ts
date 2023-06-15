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
