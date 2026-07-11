import InputCheckbox from "@/components/custom/input-checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/custom/dynamic-icon";
import { useHabitsToday } from "@/hooks/habit";
import { useCreateHabitLog } from "@/hooks/habit-log";
import { StatusHabit } from "@/types/model";

export default function HabitList({
  calendarRefresh,
  date,
  habitToday,
}: {
  calendarRefresh: () => void;
  date: string;
  habitToday: ReturnType<typeof useHabitsToday>;
}) {
  const { data = [], isPending: loading, refetch: refresh } = habitToday;
  const { mutate: create } = useCreateHabitLog();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Today's Todos</h2>
      <div className="flex flex-col gap-4">
        {data.map((e) => {
          return (
            <Card className="py-3" key={e.id}>
              <CardContent className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <DynamicIcon iconName={e.icon} color={e.color} />
                  <p className="tracking-wide text-base font-medium">
                    {e.name}
                  </p>
                </div>
                <InputCheckbox
                  checked={e.isLog}
                  disabled={loading}
                  onChange={(val) => {
                    create(
                      {
                        habitId: e.id,
                        status: val ? StatusHabit.DONE : StatusHabit.SKIPPED,
                        date,
                      },
                      {
                        onSuccess: () => {
                          refresh();
                          calendarRefresh();
                        },
                      },
                    );
                  }}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
