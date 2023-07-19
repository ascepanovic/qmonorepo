import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { Modal, ModalProps } from ".";

import { ROUTES } from "@/constants";
import { useAuthContext, useNotificationContext } from "@/context";
import { socket } from "@/lib/socket";
import { WaitingGameT } from "@/types";

export type JoinGameModalProps = Omit<
  ModalProps,
  "body" | "submitText" | "title" | "submitHandler"
>;

export const JoinGameModal = ({
  visible,
  setVisibility,
}: JoinGameModalProps) => {
  const navigate = useNavigate();
  const [games, setGames] = useState<WaitingGameT[]>([]);
  const [selected, setSelected] = useState<WaitingGameT>();
  const { user } = useAuthContext();
  const { notify } = useNotificationContext();

  const handleSubmit = () => {
    if (selected && user) {
      socket.emit("joinGame", selected.id, user.id);
      setVisibility(false);
      navigate(ROUTES.ROOM);
    }
  };

  useEffect(() => {
    socket.on("waitingGames", setGames);
    socket.on("joinGameError", notify);
    socket.emit("getWaitingGames");

    return () => {
      socket.off("waitingGames", setGames);
      socket.off("joinGameError", notify);
    };
  }, []);

  const ModalBody = () => (
    <div className="flex h-60 flex-col gap-2 overflow-y-auto rounded-lg border-2 border-solid border-main py-2 ">
      {games.map((game) => (
        <div
          key={game.id}
          className={`flex justify-between px-4 py-2 transition-all ${
            game.id === selected?.id ? "bg-main text-main-bg" : ""
          }`}
          onClick={() => setSelected(game)}
        >
          <span>{game.category}</span>
          <span>{game.playerCount} / 4</span>
        </div>
      ))}
    </div>
  );

  const Header = () => (
    <div className="flex items-center justify-between rounded-t border-b border-solid border-main p-5 px-10">
      <h3 className="text-2xl ">Join Room</h3>
      <button
        className="border-1
float-right  flex  items-center justify-center transition-colors ease-in-out  hover:text-main"
        onClick={() => socket.emit("getWaitingGames")}
      >
        <BiRefresh className="text-3xl" />
      </button>
    </div>
  );

  return (
    <Modal
      setVisibility={setVisibility}
      visible={visible}
      header={<Header />}
      body={<ModalBody />}
      submitHandler={handleSubmit}
      submitText="Join"
      title="Join Room"
    />
  );
};
