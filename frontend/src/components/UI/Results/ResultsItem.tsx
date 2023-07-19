import { ResultItemT } from "@/types";

export const ResultsItem = ({
  user,
  points,
  color,
}: Omit<ResultItemT, "won"> & { color: string }) => (
  <div className="flex items-center  gap-7 text-main">
    <img
      src={user.photo}
      alt=""
      className={`h-10 w-10 rounded-full border-2 border-[black] shadow-[0_0_0_4px_${color}] md:h-14 md:w-14`}
    />
    <div className="flex flex-col">
      <p>{user.name}</p>
      <p>Points: {points}</p>
    </div>
  </div>
);
