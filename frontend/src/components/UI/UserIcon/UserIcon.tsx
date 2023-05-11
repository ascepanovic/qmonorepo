import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import useLoginQuery, { useLogin, useLoginKey } from '@/api/useLoginQuery';
import { queryClient } from '@/lib/react-query';
import { User } from './User';
import useUserQuery from '@/api/useUserQuery';

export const UserIcon = () => {
  const { data: isLogged } = useLoginQuery();
  const { data: user } = useUserQuery({ options: { enabled: !!isLogged } });

  const loginHandler = async ({ credential }: CredentialResponse) => {
    try {
      const response = await useLogin({ credential: credential as string });

      //TODO NOTIFICATION LOGIC
      // console.log(response.message);

      queryClient.setQueryData(useLoginKey, true);
    } catch (e) {
      //TODO NOTIFICATION LOGIC
      // console.log(e.message);
    }
  };

  if (isLogged && user) return <User user={user} />;
  return (
    <GoogleLogin
      onSuccess={loginHandler}
      theme="filled_black"
      type="icon"
      shape="circle"
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    />
  );
};
