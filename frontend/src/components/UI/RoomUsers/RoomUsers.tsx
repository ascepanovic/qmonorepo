import { RoomUserCard } from "./RoomUserCard";

import { UserT } from "@/types";

export type RoomUsersProps = {
  users: UserT[];
};

export const RoomUsers = ({ users }: RoomUsersProps) => {
  const [user1, user2, ...restUsers] = users;
  return (
    <section className="fixed flex h-screen w-full flex-col justify-between p-8 pt-32 md:flex-row md:justify-center md:gap-4">
      <div className="flex justify-evenly gap-4 md:gap-4">
        <RoomUserCard user={user1} />
        <RoomUserCard user={user2} />
      </div>
      {restUsers.length > 0 ? (
        <div className="flex justify-evenly gap-4 md:gap-4">
          {restUsers.map((user, i) => (
            <RoomUserCard user={user} key={i} />
          ))}
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
