import { api } from "@/lib/axios";
import type { Habit } from "@/types/model";
import type { ApiListResponse, ApiResponse } from "@/types/response";

type HabitRequest = {
  name: string;
  color: string;
  icon: string;
};

export const habitService = {
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

  create: async (body: HabitRequest): Promise<Habit> => {
    const response = await api.post<ApiResponse<Habit>>("/habit", body);
    return response.data.data!;
  },

  update: async (id: string, body: HabitRequest): Promise<Habit> => {
    const response = await api.patch<ApiResponse<Habit>>(`habit/${id}`, body);
    return response.data.data!;
  },

  destroy: async (id: string): Promise<Habit> => {
    const response = await api.delete<ApiResponse<Habit>>(`habit/${id}`);
    return response.data.data!;
  },
};
