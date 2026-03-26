import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DynamicIcon } from "@/components/blocks/dynamicIcon";
import { getDay, getUserFromLocalStorage } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputCheckbox from "@/components/blocks/input-checkbox";
import { Input } from "@/components/ui/input";
import { useHabitToday } from "../hooks/useHabitToday";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import HabitCalendar from "./HabitCalendar";

export default function HabitCard() {
  const day = getDay();
  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-4xl font-semibold">
            Happy <br /> {day.toLocaleDateString("en-US", { weekday: "long" })}
          </h2>
          <p className="tracking-wider text-gray-500 text-sm">
            {day.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button>
            <Link to={`/habit`}>Browse Your Habits</Link>
          </Button>
        </div>

      </div>
    </>
  );
}
