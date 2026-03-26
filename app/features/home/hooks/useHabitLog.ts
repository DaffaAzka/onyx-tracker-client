import { HabitLogAPI } from "@/lib/api/habit_log";
import type { HabitLog, HabitLogGroupedByDate } from "@/types/habit_log";
import { useEffect, useState } from "react";

export default function useHabitLog() {
  const [data, setData] = useState<HabitLog[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await HabitLogAPI.get();
      setData(res);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed fetching data!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refresh: fetch };
}
