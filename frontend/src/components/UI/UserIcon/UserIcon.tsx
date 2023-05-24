import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import { User } from "./User";

import { useLogin, useUser } from "@/api";
import { useAuthContext } from "@/context";

export const UserIcon = () => {
  const { user, login } = useAuthContext();

  const loginHandler = ({ credential }: CredentialResponse) => {
    useLogin({ credential: credential as string }).then(() => {
      useUser().then((e) => login(e.data));
    });
  };

  if (user) return <User user={user} />;
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
