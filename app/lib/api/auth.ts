import type { SignInCredentials, SignInResponse } from "@/types/auth";
import type { ApiResponse } from "@/types/response";
import { api } from "../axios";

export const authAPI = {
  signIn: async (credentials: SignInCredentials): Promise<SignInResponse> => {
    const response = await api.post<ApiResponse<SignInResponse>>(
      "/auth/sign-in",
      credentials,
    );

    return response.data.data!;
  },
};
