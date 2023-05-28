import { Navigate } from "react-router-dom";

import { Profile } from "@/components/Pages";
import { Home } from "@/components/Pages/Home";

export const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <Navigate to="." /> },
];
