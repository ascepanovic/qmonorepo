import { GameHistory } from "../UI/GameHistory";
import { Question } from "../UI/Question";
import { Results } from "../UI/Results";
import { RoomUsers } from "../UI/RoomUsers";
import { StartTimer, Timer } from "../UI/Timer";

export const Room = () => (
  <>
    <Timer />
    <RoomUsers />
    <Question />
    <GameHistory />
    <Results />
    <StartTimer />
  </>
);
