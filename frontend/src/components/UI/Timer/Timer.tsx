import { ReactNode, useEffect, useState } from "react";
import { FaStopwatch } from "react-icons/fa";

import { useTimer } from "@/hooks";
import { socket } from "@/lib/socket";

const ROUND_TIME = 5;
const GAME_TIME = 60;

export const Timer = () => {
  const { timer: gameTime, start: startGameTimer } = useTimer({
    time: GAME_TIME,
  });
  const { timer: roundTime, start: startRoundTimer } = useTimer({
    time: ROUND_TIME,
  });

  const [started, setStarted] = useState(false);

  useEffect(() => {
    socket.on("gameCreated", () => {
      startGameTimer();
    });

    socket.on("nextQuestion", () => {
      setStarted(true);
      startRoundTimer();
    });
  }, []);

  const renderTimeline = () => {
    const timeLine: ReactNode[] = [];
    for (let i = 0; i < ROUND_TIME; i++) {
      timeLine.push(
        <TimerLine active={i + 1 <= ROUND_TIME - roundTime} key={i} />,
      );
    }
    return timeLine;
  };

  return (
    <div className="flex w-3/4 items-center justify-center gap-4">
      {started ? (
        <div className="flex w-3/4 gap-2">{renderTimeline()}</div>
      ) : (
        <div className="flex items-center justify-center gap-4 rounded-lg px-4 py-2 uppercase text-main shadow-[0_0_0_1px_#2AE78B]">
          <FaStopwatch />
          <span className="w-8">{gameTime}</span>
        </div>
      )}
    </div>
  );
};

type Props = {
  active: boolean;
};

const TimerLine = ({ active }: Props) => (
  <div
    className={`h-2 w-2 flex-1 rounded-lg border-main shadow-[0_0_0_1px_#2AE78B] ${
      active ? "bg-main" : ""
    }`}
  ></div>
);
