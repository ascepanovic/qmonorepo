import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/context";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
};
