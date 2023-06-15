import { Navigate } from "react-router-dom";

import { Home, Profile, Room } from "@/components/Pages";

export const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/room", element: <Room /> },
  { path: "*", element: <Navigate to="." /> },
];
