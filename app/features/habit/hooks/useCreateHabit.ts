import { habitAPI } from "@/lib/api/habit";
import type { CreateBody } from "@/types/habit";
import { useState } from "react";

export default function useCreateHabit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateBody) => {
    try {
      setLoading(true);
      setError(null);
      const res = await habitAPI.create(data);
      return res;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Email or password invalid!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, create };
}
