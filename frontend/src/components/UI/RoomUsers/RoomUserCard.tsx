import { UserT } from "@/types";

export type RoomUserCardProps = { user: UserT };

export const RoomUserCard = ({ user }: RoomUserCardProps) => {
  return (
    <div className="flex h-max items-center justify-center gap-4 rounded-lg p-2 shadow-[0_0_0_1px_#2AE78B] md:p-4">
      <img
        src={user.photo}
        alt="user"
        className="h-8 w-8 rounded-full md:h-16 md:w-16"
      />
      <span className="text-main">
        <p className="text-xs">{user.name}</p>
        <p className="text-xs">Points: {(Math.random() * 100).toFixed(0)}</p>
      </span>
    </div>
  );
};
