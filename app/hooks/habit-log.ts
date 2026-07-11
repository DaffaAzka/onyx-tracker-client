import { habitLogService } from "@/services/habit-log";
import type { HabitLog } from "@/types/model";
import type { ApiErrorResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useHabitLogs() {
  return useQuery<HabitLog[], ApiErrorResponse>({
    queryKey: ["habit-logs"],
    queryFn: () => habitLogService.get(),
  });
}

export function useCreateHabitLog() {
  const queryClient = useQueryClient();

  return useMutation<
    HabitLog,
    ApiErrorResponse,
    { habitId: string; date: string; status: string }
  >({
    mutationFn: (payload) => habitLogService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habit-logs"] });
      queryClient.invalidateQueries({ queryKey: ["habits-today"] });
    },
  });
}
