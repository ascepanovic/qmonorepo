import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Layout } from '@/components/Templates/Layout';
import useLoginQuery, { useLoginKey } from '@/api/useLoginQuery';
import { queryClient } from '@/lib/react-query';

export const AppRoutes = () => {
  const { data } = useLoginQuery();
  console.log(queryClient.getQueryData([useLoginKey]));
  const routes = !!data ? protectedRoutes : publicRoutes;

  const element = useRoutes([{ element: <Layout />, children: [...routes] }]);

  return <>{element}</>;
};
