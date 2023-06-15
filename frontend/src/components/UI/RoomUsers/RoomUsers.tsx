import { useEffect, useState } from "react";

import { RoomUserCard } from "./RoomUserCard";

import { socket } from "@/lib/socket";
import { UserT } from "@/types";

export type RoomUsersProps = {
  users: UserT[];
};

export const RoomUsers = ({ users }: RoomUsersProps) => {
  const [points, setPoints] = useState(0);
  useEffect(() => {
    socket.emit("getUserPoints", users[0].id);
    socket.on("userPoints", setPoints);
  }, []);

  return (
    <section className="mt-4 flex w-full justify-evenly">
      {users.map((user, i) => (
        <RoomUserCard user={user} points={points} key={i} />
      ))}
    </section>
  );
};
