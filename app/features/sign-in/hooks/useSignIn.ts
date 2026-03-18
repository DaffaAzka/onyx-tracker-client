import { authAPI } from "@/lib/api/auth";
import type { SignInCredentials } from "@/types/auth";
import { useState } from "react";

export default function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (data: SignInCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const res = await authAPI.signIn(data);
      localStorage.setItem("token", res.token);
    } catch (error) {
      setError("Email or password are invalid!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signIn };
}
