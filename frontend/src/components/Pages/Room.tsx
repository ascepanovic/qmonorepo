import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Question } from "../UI/Question";
import { RoomUsers } from "../UI/RoomUsers";

import { useAuthContext } from "@/context";
import { socket } from "@/lib/socket";

export const Room = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("gameEnded", () => navigate("/"));
  }, []);

  return (
    <>
      <RoomUsers users={[user, user, user, user]} />
      <Question />
    </>
  );
};
