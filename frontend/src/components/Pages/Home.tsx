import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../UI/Button";
import { NewGameModal, JoinGameModal } from "../UI/Modal";

const CATEGORIES = [
  { id: "1", name: "Science" },
  { id: "2", name: "Geography" },
  { id: "3", name: "Medicine" },
  { id: "4", name: "Mathematics" },
];

export const Home = () => {
  const navigate = useNavigate();
  const [newGame, setNewGame] = useState(false);
  const [joinGame, setJoinGame] = useState(false);

  const MENU_ITEMS = [
    { text: "New Game", onClick: () => setNewGame((prev) => !prev) },
    { text: "Join Game", onClick: () => setJoinGame((prev) => !prev) },
  ];

  return (
    <>
      <section
        className="mt-40 flex flex-col gap-11
    "
      >
        {MENU_ITEMS.map((e, i) => (
          <Button key={i} {...e} className="px-16 py-10 text-2xl" />
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
          setJoinGame(false);
          navigate(`/room/${roomId}`);
        }}
      />
    </>
  );
};
