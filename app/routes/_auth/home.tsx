import { Button } from "@/components/ui/button";
import HabitCalendar from "@/features/home/components/HabitCalendar";
import HabitCard from "@/features/home/components/HabitCard";
import HabitList from "@/features/home/components/HabitList";
import useHabitLog from "@/features/home/hooks/useHabitLog";
import { useHabitToday } from "@/features/home/hooks/useHabitToday";
import { getToday } from "@/lib/utils";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";

export async function clientLoader() {
  const stored = localStorage.getItem("user");
  const user: User | null = stored ? JSON.parse(stored) : null;
  return { user };
}

export default function Home() {
  const { user } = useLoaderData<typeof clientLoader>();
  const [date, setDate] = useState(getToday());

  const habitLog = useHabitLog();
  const habitToday = useHabitToday(date);

  useEffect(() => {
    habitToday.refresh();
  }, [date]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-4">
          <HabitCard />
          <HabitCalendar
            habitLog={habitLog}
            onDayClick={(dateKey) => {
              console.log("clicked");
              setDate(dateKey);
            }}
          />
        </div>

        <div className="lg:col-span-3">
          <HabitList
            calendarRefresh={habitLog.refresh}
            date={date}
            habitToday={habitToday}
          />
        </div>
      </div>
    </>
  );
}
