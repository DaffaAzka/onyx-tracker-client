import type { CreateBody, Habit } from "@/types/habit";
import { api } from "../axios";
import type { ApiListResponse, ApiResponse } from "@/types/response";

export const habitAPI = {
  get: async (): Promise<Habit[]> => {
    const response = await api.get<ApiListResponse<Habit>>("/habit");
    return response.data.data!;
  },
  today: async (date: string): Promise<Habit[]> => {
    const response = await api.get<ApiListResponse<Habit>>(
      `/habit/list/${date}`,
    );
    return response.data.data!;
  },
  create: async (body: CreateBody): Promise<Habit> => {
    const response = await api.post<ApiResponse<Habit>>("/habit", body);
    return response.data.data!;
  },
};
