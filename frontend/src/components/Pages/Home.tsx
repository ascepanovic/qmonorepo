import { useState } from "react";

import { Button } from "../UI/Button";
import { NewGameModal, JoinGameModal } from "../UI/Modal";

export const Home = () => {
  const [newGame, setNewGame] = useState(false);
  const [joinGame, setJoinGame] = useState(false);

  const MENU_ITEMS = [
    {
      text: "New Game",
      onClick: () => setNewGame((prev) => !prev),
    },
    { text: "Join Game", onClick: () => setJoinGame((prev) => !prev) },
  ];

  return (
    <>
      <section
        className="mt-40 flex flex-col gap-11
    "
      >
        {MENU_ITEMS.map((e, i) => (
          <Button key={i} className="px-16 py-10 text-2xl" {...e} />
        ))}
      </section>
      <NewGameModal setVisibility={setNewGame} visible={newGame} />
      <JoinGameModal setVisibility={setJoinGame} visible={joinGame} />
    </>
  );
};
