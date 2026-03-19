import { habitAPI } from "@/lib/api/habit";
import type { Habit } from "@/types/habit";
import { useEffect, useState } from "react";

export default function useHabit() {
  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await habitAPI.get();
        setData(res);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Email or password invalid!";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return {data, loading, error}
}
