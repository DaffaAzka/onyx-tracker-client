import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import useHabitLog from "../hooks/useHabitLog";
import { useState } from "react";
import { cn, groupByDate } from "@/lib/utils";

export default function HabitCalendar({
  habitLog,
  onDayClick,
}: {
  habitLog: ReturnType<typeof useHabitLog>;
  onDayClick: (date: string) => void;
}) {
  const { data } = habitLog;

  const grouped = groupByDate(data ?? []);

  console.log(grouped);

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
      className="rounded-lg border w-full"
      captionLayout="dropdown"
      onDayClick={(date) => {
        const e = toDateKey(date);
        onDayClick(e);
      }}
      disabled={{ after: new Date() }}
      components={{
        DayButton: ({ day, className, modifiers, ...props }: any) => {
          const dateKey = toDateKey(day?.date);
          const count = grouped[dateKey] ?? 0;
          const isSelected = modifiers?.selected;
          const bg = !isSelected && count > 0 ? getBlue(count) : undefined;

          const { style: _style, ...rest } = props;

          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              {...rest}
              className={cn(className, "rounded-md!")}
              style={bg ? { backgroundColor: bg } : undefined}
            />
          );
        },
      }}
    />
  );
}
