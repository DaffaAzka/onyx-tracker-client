import type { User } from "./model";

export type SignInBody = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  user: User;
};

export type SignUpBody = {
  name: string;
  email: string;
  password: string;
  retry_password: string;
};

export type SignUpResponse = {
  user: User;
};
