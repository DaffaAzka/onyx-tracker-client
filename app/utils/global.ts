import type { HabitLog } from "@/types/model";
import type { User } from "@/types/model";

export function getUserFromLocalStorage(): User | undefined {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return undefined;
  }

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return undefined;
  }
}

export function getDay() {
  return new Date();
}

export function getToday() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function inRange(n: number, min: number, max: number) {
  return n >= min && n <= max;
}

export function toIconName(name: string) {
  return (
    name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("") + "Icon"
  );
}

export function groupByDate(logs: HabitLog[]): Record<string, number> {
  return logs.reduce(
    (acc, log) => {
      const date = log.date!.split("T")[0];
      if (log.status === "DONE") {
        acc[date] = (acc[date] ?? 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
}

export function getFieldError(
  errors: Record<string, string[]> | null | undefined,
  field: string,
): string | null {
  return errors?.[field]?.[0] ?? null;
}
