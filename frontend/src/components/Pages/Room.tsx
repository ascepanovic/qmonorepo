import { useEffect, useState } from "react";

import { Question } from "../UI/Question";
import { Results } from "../UI/Results";
import { RoomUsers } from "../UI/RoomUsers";
import { Timer } from "../UI/Timer";

import { socket } from "@/lib/socket";
import { UserT } from "@/types";

export const Room = () => {
  const [users, setUsers] = useState<UserT[]>([]);

  useEffect(() => {
    socket.on("playersInGame", setUsers);
  }, []);

  return (
    <>
      <Timer />
      <RoomUsers users={users} />
      <Question />
      <Results />
    </>
  );
};
