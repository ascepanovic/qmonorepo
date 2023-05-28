import Placeholder from "@/assets/images/user_placeholder.png";
import { UserT } from "@/types";

export type MatchHistoryItemProps = {
  date: Date;
  players: UserT[];
  id: number;
};

const RING_CLASSES = [
  "shadow-[0_0_0_4px_gold]",
  "shadow-[0_0_0_4px_silver]",
  "shadow-[0_0_0_4px_chocolate]",
];
export const MatchHistoryItem = ({ date, players }: MatchHistoryItemProps) => {
  const dateString = date.toLocaleString().split(",");

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
            className={`h-10 w-10 rounded-full ${RING_CLASSES[i] ?? ""}`}
          />
        ))}
      </div>
      <span>
        {dateString[0]} <br />
        {dateString[1]}
      </span>
    </li>
  );
};
