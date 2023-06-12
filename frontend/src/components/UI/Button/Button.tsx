import { ReactNode } from "react";

export type ButtonProps = {
  text: ReactNode;
  onClick: () => void;
  className?: string;
};

export const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`rounded-lg uppercase shadow-[0_0_0_1px_#2AE78B] transition-all ease-in-out hover:text-main hover:shadow-[0_0_0_5px_#2AE78B] ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
