import { MatchHistoryItem, MatchHistoryItemProps } from ".";

type MatchHistoryProps = {
  matches: MatchHistoryItemProps[];
};

export const MatchHistory = ({ matches }: MatchHistoryProps) => {
  return (
    <div>
      <h1>Match history</h1>
      <ul className="flex flex-col gap-2">
        {matches.map((e) => (
          <MatchHistoryItem {...e} key={e.id} />
        ))}
      </ul>
    </div>
  );
};
