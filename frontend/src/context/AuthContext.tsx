import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { socket } from "@/lib/socket";
import { UserT } from "@/types";

type AuthContextType = {
  user: UserT | null;
  login: (user: UserT) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
  children: ReactNode;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext has to be used within <AuthContext.Provider>",
    );
  }

  return authContext;
};

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<UserT | null>(null);

  const login = useCallback((user: UserT) => setUser(user), []);
  const logout = useCallback(() => setUser(null), []);

  useEffect(() => {
    if (user) socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket, user]);

  const value = useMemo(
    () => ({
      user: user,
      login: login,
      logout: logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
