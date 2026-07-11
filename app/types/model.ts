export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  created_at: string;
  updated_at: string;
};

export type Habit = {
  id: string;
  userId: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
  isLog?: boolean;
};

export type HabitLog = {
  habitId: string;
  date?: string;
  status: StatusHabit;
  note?: string;
};

export type HabitLogGroupedByDate = {
  [date: string]: HabitLog[];
};

export enum StatusHabit {
  MISSED = "MISSED",
  SKIPPED = "SKIPPED",
  DONE = "DONE",
}
