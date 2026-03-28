import { habitAPI } from "@/lib/api/habit";
import type { CreateBody } from "@/types/habit";
import { useState } from "react";

export default function useHabitDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const destroy = async (id: string) => {
    try {
      setLoading(true);
      const res = await habitAPI.destroy(id);
      return res;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch api!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, destroy };
}
