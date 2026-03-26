import { Button } from "@/components/ui/button";
import HabitCard from "@/features/home/components/HabitCard";
import type { User } from "@/types/user";
import { Link, useLoaderData } from "react-router";

export async function clientLoader() {
  const stored = localStorage.getItem("user");
  const user: User | null = stored ? JSON.parse(stored) : null;
  return { user };
}

export default function Home() {
  const { user } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <HabitCard />
        <div className="lg:col-span-3">
          
        </div>
      </div>
    </>
  );
}
