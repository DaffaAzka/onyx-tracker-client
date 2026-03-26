import { habitAPI } from "@/lib/api/habit";
import type { Habit } from "@/types/habit";
import { useEffect, useState } from "react";

export function useHabitToday() {
  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await habitAPI.today();
      setData(res);
    } catch (err) {
      err instanceof Error ? err.message : "Failed fetching data!";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refresh: fetch };
}
