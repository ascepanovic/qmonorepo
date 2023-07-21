import { useState, useEffect } from "react";

import { RoomUserCard } from "./RoomUserCard";

import { socket } from "@/lib/socket";
import { UserT } from "@/types";

export const RoomUsers = () => {
  const [users, setUsers] = useState<UserT[]>([]);

  useEffect(() => {
    socket.on("playersInGame", setUsers);

    return () => {
      socket.off("playersInGame");
    };
  }, []);
  return (
    <section className="mt-4 flex w-full justify-evenly">
      {users.map((user, i) => (
        <RoomUserCard user={user} key={i} />
      ))}
    </section>
  );
};
