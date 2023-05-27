import { IconType } from "react-icons";

type StatsProps = {
  stats: {
    Icon: IconType;
    label: string;
    value: string;
    color?: string;
  }[];
};

export const ProfileStats = ({ stats }: StatsProps) => (
  <div className=" flex w-max flex-row items-center justify-center gap-1 rounded-xl bg-main-bg px-2 py-4 text-main md:gap-4 md:p-8">
    {stats.map(({ Icon, label, value }, i) => (
      <span
        key={i}
        className="flex w-20 flex-col items-center justify-center gap-2"
      >
        <Icon className="h-5 w-5 md:h-10 md:w-10 " />
        <div className="opacity-60">{label}</div> {value}
      </span>
    ))}
  </div>
);
