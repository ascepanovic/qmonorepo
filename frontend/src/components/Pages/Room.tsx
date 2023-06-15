import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Question } from "../UI/Question";
import { RoomUsers } from "../UI/RoomUsers";

import { socket } from "@/lib/socket";
import { UserT } from "@/types";

export const Room = () => {
  const [users, setUsers] = useState<UserT[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("gameEnded", () => navigate("/"));
    socket.on("playersInGame", setUsers);
  }, []);

  return (
    <>
      <RoomUsers users={users} />
      <Question />
    </>
  );
};
