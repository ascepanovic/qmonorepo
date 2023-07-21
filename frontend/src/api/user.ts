import { ENDPOINTS } from "@/constants";
import { http } from "@/lib/axios";
import { UserT } from "@/types";

export const user = {
  all: async () => await http<UserT[]>(ENDPOINTS.USER),
  find: async (id: string) => await http<UserT>(`${ENDPOINTS.USER}/${id}`),
  create: async (data: Omit<UserT, "id" | "role">) =>
    await http.post<UserT[]>(ENDPOINTS.USER, data),
  update: async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Omit<UserT, "id" | "role" | "photo">>;
  }) => await http.put<UserT[]>(`${ENDPOINTS.USER}/${id}`, data),
  delete: async (id: string) =>
    await http.delete<UserT>(`${ENDPOINTS.USER}/${id}`),
};
