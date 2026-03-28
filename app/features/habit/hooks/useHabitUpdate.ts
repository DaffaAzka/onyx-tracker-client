import { habitAPI } from "@/lib/api/habit";
import type { CreateBody } from "@/types/habit";
import { useState } from "react";

export default function useHabitUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: CreateBody) => {
    try {
      setLoading(true);
      const res = await habitAPI.update(id, data);
      return res;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch api!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, update}
}
