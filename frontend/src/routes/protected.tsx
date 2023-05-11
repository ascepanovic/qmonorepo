import { Navigate } from 'react-router-dom';

export const protectedRoutes = [
  { path: '/', element: <div>Index</div> },
  { path: '*', element: <Navigate to="." /> }
];
