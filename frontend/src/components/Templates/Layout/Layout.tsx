import { Link, Outlet } from "react-router-dom";

import { UserIcon } from "@/components/UI/UserIcon";
import { ROUTES } from "@/constants";

export const Layout: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-main-bg">
        <div className="flex w-full items-center justify-between px-8 py-8 md:px-16">
          <Link
            to={ROUTES.INDEX}
            className="text-2xl tracking-[1rem] text-main md:text-3xl md:tracking-[4rem]"
          >
            QUIZ
          </Link>
          <UserIcon />
        </div>
        <Outlet />
      </div>
    </>
  );
};
