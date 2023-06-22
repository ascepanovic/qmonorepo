import { ReactNode } from "react";

export type ButtonProps = {
  text: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export const Button = ({ text, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`rounded-lg uppercase shadow-[0_0_0_1px_#2AE78B] transition-all ease-in-out enabled:hover:text-main enabled:hover:shadow-[0_0_0_5px_#2AE78B] ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
