import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import Navbar from "@/components/blocks/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onyx Tracker" },
    { name: "description", content: "Welcome to Onyx Tracker!" },
  ];
}

export default function GuestLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
