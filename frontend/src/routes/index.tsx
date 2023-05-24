import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

import { Layout } from "@/components/Templates/Layout";
import { useAuthContext } from "@/context";

export const AppRoutes = () => {
  const { user } = useAuthContext();
  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([{ element: <Layout />, children: [...routes] }]);

  return <>{element}</>;
};
