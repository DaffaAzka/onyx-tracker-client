import { authService } from "@/services/auth";
import type { SignUpBody, SignUpResponse } from "@/types/auth";
import type { ApiErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation<SignUpResponse, ApiErrorResponse, SignUpBody>({
    mutationFn: (payload) => authService.signUp(payload),
    onSuccess: () => {
      globalThis.location.href = "/sign-in";
    },
  });
}
