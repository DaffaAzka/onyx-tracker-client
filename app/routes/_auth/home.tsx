import { Button } from "@/components/ui/button";
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
      <h1>Welcome Back {user?.name ?? "..."}</h1>
      <Link to={"/habit"}>
        <Button>Create Habit</Button>
      </Link>
    </>
  );
}
