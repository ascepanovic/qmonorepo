import { Question } from "../UI/Question";
import { RoomUsers } from "../UI/RoomUsers";

import { useAuthContext } from "@/context";

const QUESTION = {
  question: "Koji je zbir brojeva 1 i 2?",
  answers: [
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
  ],
};

export const Room = () => {
  const { user } = useAuthContext();
  if (!user) return <></>;
  return (
    <>
      <RoomUsers users={[user, user, user, user]} />
      <Question {...QUESTION} />
    </>
  );
};
