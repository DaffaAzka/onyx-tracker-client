import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DynamicIcon } from "@/components/blocks/dynamicIcon";
import { getDay, getUserFromLocalStorage, inRange } from "@/lib/utils";
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
        <div
          className={` ${inRange(day.getHours(), 6, 18) ? "relative bg-[url('/morning_.png')]" : "relative bg-[url('/night_.png')]"} bg-cover bg-center px-4 py-4 rounded-md`}>
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent rounded-md"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-semibold text-white">
              Happy <br />
              {day.toLocaleDateString("en-US", { weekday: "long" })}
            </h2>
            <p className="tracking-wider text-gray-100 text-sm">
              {day.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link to={`/habit`} className="w-full">
            <Button className="w-full">Browse Your Habits</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
