import { useRef } from "react";

import { Modal, ModalProps } from ".";

export type JoinGameModalProps = Omit<
  ModalProps,
  "body" | "submitText" | "title" | "submitHandler"
> & {
  submitHandler: (roomId: string) => void;
};

export const JoinGameModal = ({
  visible,
  setVisibility,
  submitHandler,
}: JoinGameModalProps) => {
  const roomIdRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const value = roomIdRef.current?.value;
    if (value) {
      submitHandler(value);
    }
  };

  return (
    <Modal
      setVisibility={setVisibility}
      visible={visible}
      body={
        <>
          <label htmlFor="categories" className="mb-4 block">
            Room ID:
          </label>
          <input
            ref={roomIdRef}
            name="categories"
            type="text"
            className="border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6 block w-full rounded-lg border p-2 text-sm"
          />
        </>
      }
      submitHandler={handleSubmit}
      submitText="Join"
      title="Join Room"
    />
  );
};
