import { Outlet, redirect } from "react-router";
import AuthBar from "@/components/auth-bar";
import type { Route } from "./+types/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onyx Tracker" },
    { name: "description", content: "Welcome to Onyx Tracker!" },
  ];
}

export async function clientLoader() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/sign-in");
  }
  return null;
}

export default function AuthLayout() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AuthBar />
        <Outlet />
      </div>
    </>
  );
}
