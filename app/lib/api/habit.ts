import type { Habit } from "@/types/habit";
import { api } from "../axios";
import type { ApiListResponse, ApiResponse } from "@/types/response";

export const habitAPI = {
  get: async (): Promise<Habit[]> => {
    const response = await api.get<ApiListResponse<Habit>>("/habit");
    return response.data.data!;
  },
  today: async (): Promise<Habit[]> => {
    const response = await api.get<ApiListResponse<Habit>>("/habit/today");
    return response.data.data!;
  },
};
