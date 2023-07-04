import { Navigate } from "react-router-dom";

import { Home, Profile, Room } from "@/components/Pages";
import { ROUTES } from "@/constants";

export const protectedRoutes = [
  { path: ROUTES.INDEX, element: <Home /> },
  { path: ROUTES.PROFILE, element: <Profile /> },
  { path: ROUTES.ROOM, element: <Room /> },
  { path: "*", element: <Navigate to={ROUTES.INDEX} /> },
];
