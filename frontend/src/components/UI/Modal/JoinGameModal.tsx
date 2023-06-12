import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, ModalProps } from ".";

import { useAuthContext } from "@/context";
import { socket } from "@/lib/socket";
import { GameT } from "@/types";

export type JoinGameModalProps = Omit<
  ModalProps,
  "body" | "submitText" | "title" | "submitHandler"
>;

export const JoinGameModal = ({
  visible,
  setVisibility,
}: JoinGameModalProps) => {
  const navigate = useNavigate();
  const [games, setGames] = useState<GameT[]>([]);
  const [selected, setSelected] = useState<GameT>();
  const { user } = useAuthContext();

  const handleSubmit = () => {
    if (selected && user) {
      socket.emit("joinGame", selected.id, user.id);
      navigate(`/room/${selected.id}`);
      setVisibility(false);
    }
  };

  const handleJoin = (userId: number) => {
    if (user && userId === user.id && selected)
      navigate(`/room/${selected.id}`);
  };

  useEffect(() => {
    socket.on("waitingGames", setGames);
    socket.on("playerJoined", handleJoin);
    socket.emit("getWaitingGames");

    return () => {
      socket.off("waitingGames");
      socket.off("playerJoined");
    };
  }, []);

  return (
    <Modal
      setVisibility={setVisibility}
      visible={visible}
      body={
        <div className="flex h-60 flex-col gap-2 overflow-y-auto rounded-lg border-2 border-solid border-main py-2">
          {games.map((game) => (
            <div
              key={game.id}
              className={`flex justify-between px-4 py-2 ${
                game.id === selected?.id ? "bg-main text-main-bg" : ""
              }`}
              onClick={() => setSelected(game)}
            >
              <span>{game.id}</span>
              <span>{game.game_status}</span>
            </div>
          ))}
        </div>
      }
      submitHandler={handleSubmit}
      submitText="Join"
      title="Join Room"
    />
  );
};
