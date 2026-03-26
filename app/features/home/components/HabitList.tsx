import InputCheckbox from "@/components/blocks/input-checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHabitToday } from "../hooks/useHabitToday";
import useHabitLogCreate from "../hooks/useHabitLogCreate";
import { StatusHabit } from "@/types/habit_log";
import { DynamicIcon } from "@/components/blocks/dynamicIcon";

export default function HabitList({
  calendarRefresh,
}: {
  calendarRefresh: () => void;
}) {
  const { data, loading, error, refresh } = useHabitToday();
  const { create, loading: loadingCreate } = useHabitLogCreate();

  return (
    <div className="flex flex-col gap-4">
      {data.map((e) => {
        return (
          <Card className="py-3">
            <CardContent className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                <DynamicIcon iconName={e.icon} color={e.color} />
                <p className="tracking-wide text-base font-medium">{e.name}</p>
              </div>
              <InputCheckbox
                checked={e.isLog}
                disabled={loading}
                onChange={(val) => {
                  console.log("clicked");
                  create(
                    {
                      habitId: e.id,
                      status: val ? StatusHabit.DONE : StatusHabit.SKIPPED,
                    },
                    () => {
                      refresh();
                      calendarRefresh();
                    },
                  );
                }}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
