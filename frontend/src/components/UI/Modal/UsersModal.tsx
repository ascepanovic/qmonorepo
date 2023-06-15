import { ModalProps, Modal } from ".";

import Placeholder from "@/assets/images/user_placeholder.png";
import { useUsers } from "@/hooks";

type Props = Omit<
  ModalProps,
  "body" | "submitText" | "title" | "submitHandler"
>;

export const UsersModal = ({ setVisibility, visible }: Props) => {
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    (event.target as HTMLImageElement).src = Placeholder;
  };

  const { users } = useUsers();

  return (
    <Modal
      setVisibility={setVisibility}
      visible={visible}
      title="Players"
      body={
        <div className="flex h-60 flex-col gap-4 overflow-y-auto rounded-lg border-2 border-solid border-main px-4 py-4">
          {users.map((e) => (
            <div key={e.id} className="flex items-center gap-4">
              {" "}
              <img
                onError={handleError}
                src={e.photo}
                className="h-10 w-10 rounded-full"
                alt=""
              />{" "}
              {e.name}
            </div>
          ))}
        </div>
      }
    />
  );
};
