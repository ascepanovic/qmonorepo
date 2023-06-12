import { ENDPOINTS } from "@/constants/Endpoints";
import { http } from "@/lib/axios";
import { LoginResponse, UserT } from "@/types";

export const auth = {
  login: async ({ credential }: { credential: string }) =>
    await http.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
      idToken: credential,
    }),
  user: async () =>
    await http<UserT>({
      url: ENDPOINTS.AUTH.CHECK,
      method: "GET",
    }),
};
