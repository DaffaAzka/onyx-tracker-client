import { useState } from "react";

export default function useCreateHabit() {
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
}
