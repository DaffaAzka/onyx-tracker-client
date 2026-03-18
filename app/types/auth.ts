import type { User } from "./user";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}
