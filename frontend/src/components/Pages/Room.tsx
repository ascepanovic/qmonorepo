import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Question } from "../UI/Question";
import { RoomUsers } from "../UI/RoomUsers";
import { Timer } from "../UI/Timer";

import { ROUTES } from "@/constants";
import { socket } from "@/lib/socket";
import { UserT } from "@/types";

export const Room = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserT[]>([]);

  useEffect(() => {
    socket.on("gameEnded", () => navigate(ROUTES.INDEX));
    socket.on("playersInGame", setUsers);
  }, []);

  return (
    <>
      <Timer />
      <RoomUsers users={users} />
      <Question />
    </>
  );
};
