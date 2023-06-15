import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, ModalProps } from ".";

import { useAuthContext } from "@/context";
import { useCategories } from "@/hooks";
import { socket } from "@/lib/socket";

type Props = Pick<ModalProps, "setVisibility" | "visible">;

export const NewGameModal = ({ setVisibility, visible }: Props) => {
  const navigate = useNavigate();
  const selectRef = useRef<HTMLSelectElement>(null);
  const { user } = useAuthContext();
  const { categories, isLoading } = useCategories();
  const handleSubmit = () => {
    const value = selectRef.current?.value;
    if (value && user) {
      socket.emit("createGame", { userId: user.id, categoryId: +value });
      setVisibility(false);
    }
  };

  const handleCreateGame = () => {
    navigate(`/room`);
  };

  useEffect(() => {
    socket.on("gameCreated", handleCreateGame);
    socket.on("joinGameError", (error) => {
      console.log(error);
    });
    return () => {
      socket.off("gameCreated");
      socket.off("joinGameError");
    };
  }, []);

  return (
    <Modal
      setVisibility={setVisibility}
      visible={visible}
      body={
        <>
          <label
            htmlFor="categories"
            className="text-gray-900 dark:text-white mb-4 block text-sm"
          >
            Category:
          </label>
          <select
            ref={selectRef}
            defaultValue={"0"}
            name="categories"
            className="text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6 block w-full rounded-lg border p-2 text-sm"
          >
            {isLoading ? (
              <option>Loading</option>
            ) : (
              <>
                <option value={"0"} disabled>
                  Choose a category
                </option>

                {categories.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </>
      }
      submitHandler={handleSubmit}
      submitText="Create"
      title="Create Room"
    />
  );
};
