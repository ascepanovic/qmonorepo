import { useEffect, useState } from "react";

import { socket } from "@/lib/socket";
import { UserT } from "@/types";

export type RoomUserCardProps = { user: UserT };

export const RoomUserCard = ({ user }: RoomUserCardProps) => {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [points, setPoints] = useState(0);

  const answerResultHandler = ({ userId }: { userId: number }) => {
    if (userId === user.id) {
      setPoints((prev) => prev + 1);
      setDisplay(true);
    }
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
  };

  useEffect(() => {
    socket.on("answerResult", answerResultHandler);

    return () => {
      socket.off("answerResult", answerResultHandler);
    };
  }, []);

  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="relative flex h-max items-center justify-center gap-4 rounded-lg p-2 shadow-[0_0_0_1px_#2AE78B] md:p-4"
    >
      <img
        src={user.photo}
        alt="user"
        className="h-8 w-8 rounded-full md:h-16 md:w-16"
      />
      <span
        className={`${
          open ? "scale-x-100" : "scale-x-0"
        }  origin-left text-main transition-all md:scale-x-100`}
      >
        <p className="text-xs">{user.name}</p>
        <p className="text-xs">Points: {points}</p>
      </span>

      <h1
        className={`absolute right-0 top-1/2 -translate-y-1/2 text-xl text-main transition-opacity ${
          display ? "opacity-100" : "opacity-0"
        }`}
      >
        +1
      </h1>
    </div>
  );
};
