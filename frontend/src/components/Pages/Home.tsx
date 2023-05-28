import { useState } from "react";

import { MenuItem } from "../UI/MenuItem";
import { NewGameModal, JoinGameModal } from "../UI/Modal";

const CATEGORIES = [
  { id: "1", name: "Science" },
  { id: "2", name: "Geography" },
  { id: "3", name: "Medicine" },
  { id: "4", name: "Mathematics" },
];

export const Home = () => {
  const [newGame, setNewGame] = useState(false);
  const [joinGame, setJoinGame] = useState(false);
  const MENU_ITEMS = [
    { title: "New Game", onClick: () => setNewGame((prev) => !prev) },
    { title: "Join Game", onClick: () => setJoinGame((prev) => !prev) },
  ];

  return (
    <>
      <section
        className="mt-40 flex flex-col gap-11
    "
      >
        {MENU_ITEMS.map((e, i) => (
          <MenuItem key={i} {...e} />
        ))}
      </section>
      <NewGameModal
        categories={CATEGORIES}
        setVisibility={setNewGame}
        visible={newGame}
        submitHandler={(categoryId) => {
          console.log(categoryId);
          setNewGame(false);
        }}
      />
      <JoinGameModal
        setVisibility={setJoinGame}
        visible={joinGame}
        submitHandler={(roomId) => {
          console.log(roomId);
          setJoinGame(false);
        }}
      />
    </>
  );
};
