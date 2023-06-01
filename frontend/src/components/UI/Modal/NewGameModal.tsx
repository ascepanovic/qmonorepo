import { useRef } from "react";

import { Modal, ModalProps } from ".";

type Props = Omit<
  ModalProps,
  "body" | "submitText" | "title" | "submitHandler"
> & {
  categories: {
    id: string;
    name: string;
  }[];
  submitHandler: (categoryId: string) => void;
};

export const NewGameModal = ({
  categories,
  setVisibility,
  submitHandler,
  visible,
}: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const handleSubmit = () => {
    const value = selectRef.current?.value;
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
            <option value={"0"} disabled>
              Choose a category
            </option>
            {categories.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </>
      }
      submitHandler={handleSubmit}
      submitText="Create"
      title="Create Room"
    />
  );
};
