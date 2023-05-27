import { Navigate } from "react-router-dom";

import Brain from "../assets/images/brain_transparent.png";
export const publicRoutes = [
  {
    path: "/",
    element: <img src={Brain} className="mt-24 w-3/4 md:w-2/5" alt="" />,
  },
  { path: "*", element: <Navigate to="." /> },
];
