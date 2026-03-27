export interface HabitLog {
  habitId: string;
  date?: string;
  status: StatusHabit;
  note?: string;
}

export interface HabitLogGroupedByDate {
  [date: string]: HabitLog[];
}

export interface CreateBody {
  habitId: string;
  date: string;
  status: StatusHabit;
}

export enum StatusHabit {
  MISSED = "MISSED",
  SKIPPED = "SKIPPED",
  DONE = "DONE",
}
