import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHabitToday } from "../hooks/useHabitToday";
import { DynamicIcon } from "@/components/blocks/dynamicIcon";
import { getUserFromLocalStorage } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HabitCard() {
  const { data, loading, error, refresh } = useHabitToday();
  const user = getUserFromLocalStorage();

  return (
    <>
      <Card className="h-[96vh]">
        <CardContent className="flex flex-row justify-center">
          <div className="">
            <div className="flex flex-col gap-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-center text-xl">{user?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
