import { Button } from "../Button";

export type QuestionProps = {
  question: string;
  answers: { id: number; text: string }[];
};

export const Question = ({ question, answers }: QuestionProps) => {
  return (
    <section
      className="z-10 flex flex-col
   items-center gap-20 pt-40"
    >
      <p className="w-2/3 text-center">{question}</p>
      <div className="grid grid-cols-2 gap-4">
        {answers.map(({ id, text }) => (
          <Button
            text={text}
            key={id}
            onClick={() => console.log(text)}
            className="px-6 py-4"
          />
        ))}
      </div>
    </section>
  );
};
