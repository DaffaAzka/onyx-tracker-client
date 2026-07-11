import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import Navbar from "@/components/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onyx Tracker" },
    { name: "description", content: "Welcome to Onyx Tracker!" },
  ];
}

export async function clientLoader() {
  const token = localStorage.getItem("token");
  if (token) {
    throw redirect("/home");
  }
  return null;
}

export default function GuestLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Outlet />
      </div>
    </>
  );
}
