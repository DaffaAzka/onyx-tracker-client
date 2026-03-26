import { Button } from "@/components/ui/button";
import HabitCalendar from "@/features/home/components/HabitCalendar";
import HabitCard from "@/features/home/components/HabitCard";
import HabitList from "@/features/home/components/HabitList";
import useHabitLog from "@/features/home/hooks/useHabitLog";
import type { User } from "@/types/user";
import { Link, useLoaderData } from "react-router";

export async function clientLoader() {
  const stored = localStorage.getItem("user");
  const user: User | null = stored ? JSON.parse(stored) : null;
  return { user };
}

export default function Home() {
  const { user } = useLoaderData<typeof clientLoader>();
  const habitLog = useHabitLog();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-4">
          <HabitCard />
          <HabitCalendar habitLog={habitLog} />
        </div>

        <div className="lg:col-span-3">
          <HabitList calendarRefresh={habitLog.refresh} />
        </div>
      </div>
    </>
  );
}
