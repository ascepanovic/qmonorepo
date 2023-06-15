import { useState } from "react";

import { UserT } from "@/types";

export type RoomUserCardProps = { user: UserT; points: number };

export const RoomUserCard = ({ user, points }: RoomUserCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="flex h-max items-center justify-center gap-4 rounded-lg p-2 shadow-[0_0_0_1px_#2AE78B] md:p-4"
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
    </div>
  );
};
