import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { auth } from "@/api";
import { ROUTES } from "@/constants";
import { useAuthContext } from "@/context";

export const User = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useAuthContext();
  const toggleMenu = () => setMenu((prev) => !prev);

  const logoutHandler = () => {
    toggleMenu();
    auth.logout().then(logout);
  };

  return (
    <div
      className="flex items-center justify-center gap-8
    "
    >
      <div className="relative">
        <button onClick={toggleMenu}>
          <img
            referrerPolicy="no-referrer"
            src={user?.photo}
            alt=""
            className="h-12 rounded-full"
          />
        </button>
        <div
          className={`
          ${menu ? "scale-y-100" : ""}
          duration-250 absolute right-0 top-[calc(100%+1rem)] z-10 origin-top scale-y-0 rounded-lg bg-[white] p-1 transition-transform ease-in-out`}
        >
          <ul className="flex w-max flex-col gap-1 text-xs uppercase">
            <li>
              <Link
                className="flex gap-2 rounded-lg px-4 py-2 hover:bg-main-bg hover:text-main"
                onClick={toggleMenu}
                to={ROUTES.PROFILE}
              >
                profile
                <span>
                  <FaUserAlt className="h-4 w-4" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.INDEX}
                className="flex gap-2 rounded-lg px-4 py-2 hover:bg-main-bg hover:text-main"
                onClick={logoutHandler}
              >
                logout
                <span>
                  <BiLogOut className="h-4 w-4" />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
