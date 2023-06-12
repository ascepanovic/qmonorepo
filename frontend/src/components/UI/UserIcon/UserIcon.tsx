import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import { Button } from "../Button";
import { UsersModal } from "../Modal";

import { User } from "./User";

import { auth } from "@/api";
import { useAuthContext } from "@/context";

export const UserIcon = () => {
  const { user, login } = useAuthContext();

  const [visibility, setVisibility] = useState(false);

  const loginHandler = ({ credential }: CredentialResponse) => {
    auth.login({ credential: credential as string }).then(() => {
      auth.user().then((e) => login(e.data));
    });
  };

  if (user)
    return (
      <>
        <div className="flex items-center justify-center gap-8">
          <Button
            onClick={() => setVisibility(true)}
            text={
              <span className="flex items-center justify-center gap-2">
                <FaUserAlt></FaUserAlt> <span>50</span>
              </span>
            }
            className="px-4 py-2"
          />
          <User />
        </div>
        <UsersModal visible={visibility} setVisibility={setVisibility} />
      </>
    );
  return (
    <GoogleLogin
      onSuccess={loginHandler}
      theme="filled_black"
      type="icon"
      shape="circle"
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
    />
  );
};
