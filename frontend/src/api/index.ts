import { ENDPOINTS } from "@/constants/Endpoints";
import { http } from "@/lib/axios";
import { LoginResponse, UserT } from "@/types";

export const useLogin = async ({ credential }: { credential: string }) => {
  return await http.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
    idToken: credential,
  });
};

export const useUser = async () => {
  return await http<UserT>({
    url: ENDPOINTS.AUTH.CHECK,
    method: "GET",
  });
};
