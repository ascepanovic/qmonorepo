import { Navigate } from "react-router-dom";

import { Profile } from "@/components/Pages";

export const protectedRoutes = [
  { path: "/", element: <div>Index</div> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <Navigate to="." /> },
];
