import { api } from "@/lib/axios";
import type { HabitLog } from "@/types/model";
import type { ApiListResponse, ApiResponse } from "@/types/response";

type HabitLogRequest = {
  habitId: string;
  date: string;
  status: string;
};

export const habitLogService = {
  create: async (body: HabitLogRequest): Promise<HabitLog> => {
    const response = await api.post<ApiResponse<HabitLog>>("habit_log", body);
    return response.data.data!;
  },

  get: async (): Promise<HabitLog[]> => {
    const response = await api.get<ApiListResponse<HabitLog>>("/habit_log");
    return response.data.data;
  },
};
