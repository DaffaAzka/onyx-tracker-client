import { Outlet, redirect, useNavigate } from "react-router";
import Navbar from "@/components/blocks/navbar";
import type { Route } from "../../+types/root";
import { useEffect } from "react";
import { authAPI } from "@/lib/api/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onyx Tracker" },
    { name: "description", content: "Welcome to Onyx Tracker!" },
  ];
}

export async function clientLoader() {
  await authAPI.check();
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
        <Outlet />
      </div>
    </>
  );
}
