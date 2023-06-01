import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { ENDPOINTS } from "@/constants/Endpoints";
import { useAuthContext } from "@/context";
import { http } from "@/lib/axios";
import { UserT } from "@/types";

type UserProps = {
  user: UserT;
};

export const User = ({ user }: UserProps) => {
  const [menu, setMenu] = useState(false);
  const { logout } = useAuthContext();
  const toggleMenu = () => setMenu((prev) => !prev);

  const logoutHandler = () => {
    toggleMenu();
    http(ENDPOINTS.AUTH.LOGOUT).then(logout);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu}>
        {" "}
        <img src={user.photo} alt="" className="h-12 rounded-full" />
      </button>
      <div
        className={`
          ${menu ? "scale-y-100" : ""}
          transition-transform duration-250 ease-in-out scale-y-0 origin-top absolute top-[calc(100%+1rem)] right-0 bg-[white] rounded-lg p-4`}
      >
        <ul className="flex flex-col gap-4 uppercase text-xs w-max">
          <li>
            <Link className="flex gap-2" onClick={toggleMenu} to={"/profile"}>
              profile
              <span>
                <FaUserAlt className="h-4 w-4" />
              </span>
            </Link>
          </li>
          <li>
            <button className="flex gap-2" onClick={logoutHandler}>
              logout
              <span>
                <BiLogOut className="h-4 w-4" />
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};