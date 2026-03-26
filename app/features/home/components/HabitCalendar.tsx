import { Calendar } from "@/components/ui/calendar";
import useHabitLog from "../hooks/useHabitLog";
import { useState } from "react";
import { groupByDate } from "@/lib/utils";

export default function HabitCalendar({
  habitLog,
}: {
  habitLog: ReturnType<typeof useHabitLog>;
}) {
  const { data } = habitLog;

  const grouped = groupByDate(data ?? []);

  console.log(grouped)

  const toDateKey = (date: Date | undefined) => {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const shades = [
    "#ede9fb",
    "#cdc3f5",
    "#ad9def",
    "#8d77e9",
    "#6d51e3",
    "#432DD7",
  ];

  const getBlue = (count: number) => {
    const index = Math.min(count - 1, shades.length - 1);
    return shades[index];
  };

  return (
    <Calendar
      mode="single"
      className="rounded-lg border w-full pointer-events-none"
      captionLayout="dropdown"
      components={{
        Day: ({ day, ...props }: any) => {
          const count = grouped[toDateKey(day?.date)] ?? 0;
          const bg = count > 0 ? getBlue(count) : undefined;

          return (
            <button
              {...props}
              className={`${props.className ?? ""} rounded-md!`}
              style={{ ...props.style, backgroundColor: bg }}
            />
          );
        },
      }}
    />
  );
}
