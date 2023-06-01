import { IconType } from "react-icons";
import { BsController, BsTrophy } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { SlClose } from "react-icons/sl";

import { MatchHistory } from "../UI/MatchHistory";
import { ProfileStats } from "../UI/ProfileStats";

import { useAuthContext } from "@/context";

const MOCK_STATS = [
  {
    Icon: BsController as IconType,
    label: "Played",
    value: (Math.random() * 100).toFixed(0),
  },
  {
    Icon: BsTrophy as IconType,
    label: "Won",
    value: (Math.random() * 100).toFixed(0),
  },
  {
    Icon: SlClose as IconType,
    label: "Lost",
    value: (Math.random() * 100).toFixed(0),
  },
  {
    Icon: FaRegHandshake as IconType,
    label: "Tied",
    value: (Math.random() * 100).toFixed(0),
  },
];

export const Profile = () => {
  const { user } = useAuthContext();

  if (!user) return <></>;
  return (
    <section className="relative mt-12 flex w-11/12 flex-col items-center gap-8 rounded-xl bg-gradient-to-r from-[#2C3E50] via-[#2AE78B] to-[#2C3E50] px-0 py-16 md:w-4/5 md:p-16">
      <img
        referrerPolicy="no-referrer"
        src={user?.photo}
        alt="player"
        className="absolute left-1/2 top-0 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-solid border-main-bg"
      />
      <p className="text-center text-2xl uppercase">{user?.name}</p>
      <ProfileStats stats={MOCK_STATS} />
      <MatchHistory
        matches={[
          { date: new Date(), players: [user, user, user, user], id: 0 },
          { date: new Date(), players: [user, user, user, user], id: 1 },
          { date: new Date(), players: [user, user, user, user], id: 2 },
          { date: new Date(), players: [user, user, user, user], id: 3 },
        ]}
      />
    </section>
  );
};
