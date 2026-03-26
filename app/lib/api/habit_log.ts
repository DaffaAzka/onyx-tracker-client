import type {
  CreateBody,
  HabitLog,
  HabitLogGroupedByDate,
} from "@/types/habit_log";
import { api } from "../axios";
import type { ApiListResponse, ApiResponse } from "@/types/response";

export const HabitLogAPI = {
  create: async (body: CreateBody): Promise<HabitLog> => {
    const response = await api.post<ApiResponse<HabitLog>>("habit_log", body);
    return response.data.data!;
  },
  get: async (): Promise<HabitLog[]> => {
    const response = await api.get<ApiListResponse<HabitLog>>("/habit_log");
    return response.data.data;
  },
};
