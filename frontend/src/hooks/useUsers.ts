import { useState, useEffect } from "react";

import { user } from "@/api";
import { UserT } from "@/types";

export const useUsers = () => {
  const [users, setUsers] = useState<UserT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await user.all();
        setUsers(res.data);
      } catch (e) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    getUsers();
  }, []);

  return { users, isLoading, hasError };
};
