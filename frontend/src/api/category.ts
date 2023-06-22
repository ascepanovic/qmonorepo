import { ENDPOINTS } from "@/constants";
import { http } from "@/lib/axios";
import { CategoryT } from "@/types";

export const category = {
  all: async () => await http<CategoryT[]>(ENDPOINTS.CATEGORY),
  find: async (id: string) =>
    await http<CategoryT>(`${ENDPOINTS.CATEGORY}/${id}`),
  create: async (data: Omit<CategoryT, "id">) =>
    await http.post<CategoryT[]>(ENDPOINTS.CATEGORY, data),
  update: async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Omit<CategoryT, "id">>;
  }) => await http.put<CategoryT[]>(`${ENDPOINTS.CATEGORY}/${id}`, data),
  delete: async (id: string) =>
    await http.delete<CategoryT>(`${ENDPOINTS.CATEGORY}/${id}`),
};
