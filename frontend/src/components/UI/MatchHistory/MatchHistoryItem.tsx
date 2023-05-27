import Placeholder from "@/assets/images/user_placeholder.png";
import { UserT } from "@/types";

export type MatchHistoryItemProps = {
  date: Date;
  players: UserT[];
  id: number;
};

export const MatchHistoryItem = ({ date, players }: MatchHistoryItemProps) => {
  const imageErrorHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    (e.target as HTMLImageElement).src = Placeholder;
  };
  return (
    <li className="flex items-center gap-4 rounded-lg bg-main-bg px-4 py-2 text-main ">
      <div className="flex gap-6">
        {players.map((e, i) => (
          <img
            key={i}
            src={e?.photo}
            onError={imageErrorHandler}
            alt=""
            className={`h-10 w-10 rounded-full shadow-[0_0_0_4px_${
              i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "chocolate" : ""
            }]`}
          />
        ))}
      </div>
      <span>
        {date.toLocaleString().split(",")[0]} <br />
        {date.toLocaleString().split(",")[1]}
      </span>
    </li>
  );
};
