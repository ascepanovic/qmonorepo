import { ENDPOINTS } from '@/constants/Endpoints';
import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

export const useLogin = async ({ credential }: { credential: string }) => {
  const { data } = await axios({
    url: ENDPOINTS.AUTH.LOGIN,
    method: 'POST',
    data: { idToken: credential }
  });
  return data;
};

export const useLoginKey = 'useLogin';

const useLoginQuery = () => useQuery<Boolean, any>([useLoginKey], () => false);

// const useLoginQuery = ({
//   credential,
//   options
// }: {
//   credential: string;
//   options?: Omit<UseQueryOptions<Boolean, any, Boolean, QueryKey>, 'queryKey' | 'queryFn'>;
// }) => useQuery<Boolean, any>([useLoginKey], () => useLogin({ credential }), options);

export default useLoginQuery;
