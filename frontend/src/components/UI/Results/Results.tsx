import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";

import { ResultsItem } from "./ResultsItem";
import { ResultsTrophy } from "./ResultsTrophy";

import First from "@/assets/images/prize/1st-prize-icon.svg";
import Second from "@/assets/images/prize/2nd-prize-icon.svg";
import Third from "@/assets/images/prize/3rd-prize-icon.svg";
import { ROUTES } from "@/constants";
import { socket } from "@/lib/socket";
import { ResultItemT } from "@/types";

const PRIZE = [
  { classes: "", photo: First, color: "gold" },
  { classes: "mt-4", photo: Second, color: "silver" },
  { classes: "mt-6", photo: Third, color: "chocolate" },
];

export const Results = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResultItemT[]>([]);

  useEffect(() => {
    socket.on("scoreBoard", setData);

    return () => {
      socket.off("scoreBoard", setData);
    };
  }, []);

  return data.length ? (
    <>
      <div
        className={`fixed left-1/2 top-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none focus:outline-none`}
      >
        <div className="mx-auto rounded-lg bg-main-bg px-10 py-10 shadow-[0_0_20px_10px_#2AE78B]">
          <div className="bg-white flex w-full flex-col items-center gap-10 rounded-lg md:gap-20">
            <div className="flex flex-auto justify-evenly gap-4">
              {data.map(({ user }, i) => (
                <ResultsTrophy key={i} prize={PRIZE[i]} user={user} />
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {data.map(({ user, points }, i) => (
                <ResultsItem
                  key={i}
                  user={user}
                  points={points}
                  color={PRIZE[i].color}
                />
              ))}
            </div>
            <Button
              className="w-3/4 py-2"
              text="Home"
              onClick={() => navigate(ROUTES.INDEX)}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-[#000000]  opacity-50 transition-opacity ease-in-out`}
      ></div>
    </>
  ) : (
    <div></div>
  );
};
