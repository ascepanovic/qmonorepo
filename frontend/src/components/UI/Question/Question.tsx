import { useState, useEffect } from "react";

import { Button } from "../Button";

import { useAuthContext, useNotificationContext } from "@/context";
import { socket } from "@/lib/socket";
import { QuestionT, ServerToClientEvents } from "@/types";

export const Question = () => {
  const { user } = useAuthContext();
  const { notify } = useNotificationContext();
  const [disabled, setDisabled] = useState(false);
  const [question, setQuestion] = useState<QuestionT>();

  const handleAnswer = (id: number) => {
    setDisabled(true);
    socket.emit("answer", user!.id, id);
    socket.emit("getUserPoints", user!.id);
  };

  const nextQuestionHandler: ServerToClientEvents["nextQuestion"] = ({
    question,
  }) => {
    setDisabled(false);
    setQuestion(question.question);
  };

  useEffect(() => {
    socket.on("gameStarted", setQuestion);
    socket.on("nextQuestion", nextQuestionHandler);
    socket.on("timerExpired", () => {
      setDisabled(true);
      return notify("Timer expired!");
    });
    return () => {
      socket.off("gameStarted", setQuestion);
      socket.off("nextQuestion", nextQuestionHandler);
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
            {question.answers.map(({ id, text, is_correct }) => (
              <div key={id}>
                <Button
                  text={text}
                  onClick={() => handleAnswer(id)}
                  className={`px-6 py-4 ${
                    disabled
                      ? is_correct
                        ? "shadow-[0_0_0_6px_#2AE78B]"
                        : "shadow-[0_0_0_6px_#D70040]"
                      : ""
                  }`}
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="w-2/3 text-center">Waiting for game to start...</p>
      )}
    </section>
  );
};
