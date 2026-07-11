import { habitService } from "@/services/habit";
import type { Habit } from "@/types/model";
import type { ApiErrorResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useHabits() {
  return useQuery<Habit[], ApiErrorResponse>({
    queryKey: ["habits"],
    queryFn: () => habitService.get(),
  });
}

export function useHabitsToday(date: string) {
  return useQuery<Habit[], ApiErrorResponse>({
    queryKey: ["habits-today", date],
    queryFn: () => habitService.today(date),
  });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation<
    Habit,
    ApiErrorResponse,
    { name: string; color: string; icon: string }
  >({
    mutationFn: (payload) => habitService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}

export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation<
    Habit,
    ApiErrorResponse,
    { id: string; data: { name: string; color: string; icon: string } }
  >({
    mutationFn: ({ id, data }) => habitService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation<Habit, ApiErrorResponse, string>({
    mutationFn: (id) => habitService.destroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}
