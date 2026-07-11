import HabitCalendar from "@/features/home/components/habit-calendar";
import HabitCard from "@/features/home/components/habit-card";
import HabitList from "@/features/home/components/habit-list";
import { useHabitLogs } from "@/hooks/habit-log";
import { useHabitsToday } from "@/hooks/habit";
import { getToday } from "@/utils/global";
import type { User } from "@/types/model";
import { useEffect, useState } from "react";

export async function clientLoader() {
  const stored = localStorage.getItem("user");
  const user: User | null = stored ? JSON.parse(stored) : null;
  return { user };
}

export default function Home() {
  const [date, setDate] = useState(getToday());

  const habitLog = useHabitLogs();
  const habitToday = useHabitsToday(date);

  useEffect(() => {
    habitToday.refetch();
  }, [date]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-4">
          <HabitCard />
          <HabitCalendar
            habitLog={habitLog}
            onDayClick={(dateKey) => {
              setDate(dateKey);
            }}
          />
        </div>

        <div className="lg:col-span-3">
          <HabitList
            calendarRefresh={habitLog.refetch}
            date={date}
            habitToday={habitToday}
          />
        </div>
      </div>
    </>
  );
}
