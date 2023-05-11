import { ENDPOINTS } from '@/constants/Endpoints';
import { axios } from '@/lib/axios';
import { UserT } from '@/types';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { useLoginKey } from '../useLoginQuery';

export const useUser = async (): Promise<UserT> => {
  const { data } = await axios({
    url: ENDPOINTS.AUTH.CHECK,
    method: 'GET'
  });
  return data;
};

export const useUserKey = 'useUser';

const useUserQuery = ({
  options
}: {
  options?: Omit<UseQueryOptions<UserT, any, UserT, QueryKey>, 'queryKey' | 'queryFn'>;
}) => useQuery<UserT, any>([useUserKey, useLoginKey], useUser, { ...options });

export default useUserQuery;
