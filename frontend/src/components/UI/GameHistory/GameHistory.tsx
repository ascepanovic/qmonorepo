import { useState, useEffect } from "react";

import { socket } from "@/lib/socket";
import { GameHistoryT } from "@/types";

export const GameHistory = () => {
  const [history, setHistory] = useState<GameHistoryT[]>([]);
  useEffect(() => {
    socket.on("gameHistory", setHistory);

    return () => {
      socket.off("gameHistory", setHistory);
    };
  }, []);

  return (
    <div
      className="text-black absolute bottom-0 left-0 flex h-52 flex-col gap-4 overflow-hidden overflow-y-scroll bg-[rgba(255,255,255,0.2)] p-4 text-xs
  "
    >
      {history.map((e, i) => (
        <div key={i}>
          <p>Q: {e.question}</p>
          <ul className="pl-2 ">
            {e.answers.map((answer, i) => (
              <li key={i}>
                {e.names[i]} answered &nbsp;
                <span
                  className={e.is_correct[i] ? "text-[lime]" : "text-[red]"}
                >
                  {answer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
