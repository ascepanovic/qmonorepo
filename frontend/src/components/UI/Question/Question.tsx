import { useState, useEffect } from "react";

import { Button } from "../Button";

import { useAuthContext } from "@/context";
import { socket } from "@/lib/socket";
import { QuestionT } from "@/types";

export const Question = () => {
  const { user } = useAuthContext();
  const [question, setQuestion] = useState<QuestionT>();
  const handleAnswer = (id: number) => {
    socket.emit("getUserPoints", user!.id);
    socket.emit("answer", user!.id, id);
  };
  useEffect(() => {
    socket.on("gameStarted", (question) => {
      setQuestion(question);
      console.log("new question");
    });
    socket.on("nextQuestion", (question) => {
      setQuestion(question);
      console.log("new question");
    });
    socket.on("timerExpired", () => console.log("Timer expired!"));
    return () => {
      socket.off("gameStarted");
    };
  }, []);
  return (
    <section
      className="z-10 flex flex-col
   items-center gap-20 pt-40"
    >
      {question ? (
        <>
          <p className="w-2/3 text-center">{question.text}</p>
          <div className="grid grid-cols-2 gap-4">
            {question.answers.map(({ id, text }) => (
              <Button
                text={text}
                key={id}
                onClick={() => handleAnswer(id)}
                className="px-6 py-4"
              />
            ))}
          </div>
        </>
      ) : (
        <p className="w-2/3 text-center">Waiting for game to start...</p>
      )}
    </section>
  );
};
