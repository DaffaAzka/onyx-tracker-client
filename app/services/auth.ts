import { api } from "@/lib/axios";
import type { SignInBody, SignInResponse, SignUpBody, SignUpResponse } from "@/types/auth";
import type { ApiResponse } from "@/types/response";

export const authService = {
  signIn: async (body: SignInBody): Promise<SignInResponse> => {
    const response = await api.post<ApiResponse<SignInResponse>>(
      "/auth/sign-in",
      body,
    );
    return response.data.data!;
  },

  signUp: async (body: SignUpBody): Promise<SignUpResponse> => {
    const response = await api.post<ApiResponse<SignUpResponse>>(
      "/auth/sign-up",
      body,
    );
    return response.data.data!;
  },

  check: async () => {
    await api.get("/auth/check");
  },
};
