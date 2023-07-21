import { UserT } from "@/types";

type TrophyProps = {
  prize: {
    classes: string;
    photo: string;
    color: string;
  };
  user: UserT;
};

export const ResultsTrophy = ({ prize, user }: TrophyProps) => (
  <div
    className={`${prize.classes} flex flex-col items-center gap-4`}
    key={user.id}
  >
    <img
      src={user?.photo}
      alt=""
      className={`h-10 w-10 rounded-full border-2 border-[black] shadow-[0_0_0_4px_${prize.color}]`}
    />
    <img src={prize.photo} alt="" className="w-22 h-20 md:h-52 md:w-52" />
  </div>
);
