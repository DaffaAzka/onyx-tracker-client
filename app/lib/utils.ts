import type { User } from "@/types/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toIconName = (name: string) =>
  name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("") + "Icon";

export function getUserFromLocalStorage(): User | undefined {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return undefined;
  }

  try {
    return JSON.parse(userStr) as User;
  } catch (error) {
    return undefined;
  }
}
