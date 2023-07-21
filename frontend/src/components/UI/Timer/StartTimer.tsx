import { useEffect, useState } from "react";

import { useTimer } from "@/hooks";
import { socket } from "@/lib/socket";

export const StartTimer = () => {
  useEffect(() => {
    socket.on("gameStartCountdown", () => {
      start();
      setDisplayTimer(true);
    });

    return () => {
      socket.off("gameStartCountdown", () => {
        start();
        setDisplayTimer(true);
      });
    };
  }, []);

  const [displayTimer, setDisplayTimer] = useState(false);
  const { timer, start } = useTimer({
    time: 5,
  });

  return displayTimer && timer > 0 ? (
    <div className="fixed flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)]">
      <div
        className="flex gap-5 md:gap-20
  "
      >
        <div
          className={`h-10 w-10 rounded-full bg-[red] ${
            timer > 4 ? "opacity-30" : ""
          } md:h-40 md:w-40`}
        ></div>
        <div
          className={`h-10 w-10 rounded-full bg-[red] ${
            timer > 3 ? "opacity-30" : ""
          } md:h-40 md:w-40`}
        ></div>
        <div
          className={`h-10 w-10 rounded-full bg-[red] ${
            timer > 2 ? "opacity-30" : ""
          } md:h-40 md:w-40`}
        ></div>
        <div
          className={`h120 w-10 rounded-full bg-[yellow] ${
            timer > 1 ? "opacity-30" : ""
          } md:h-40 md:w-40`}
        ></div>
        <div
          className={`h120 w-10 rounded-full bg-[green] ${
            timer > 0 ? "opacity-30" : ""
          } md:h-40 md:w-40`}
        ></div>
      </div>
    </div>
  ) : null;
};
