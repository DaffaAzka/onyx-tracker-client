import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_guest/layout.tsx", [
    index("routes/_guest/home.tsx"),
    route("/sign-in", "routes/_guest/sign-in.tsx"),
    route("/get-started", "routes/_guest/get-started.tsx"),
  ]),

  layout("routes/_auth/layout.tsx", [
    route("/home", "routes/_auth/home.tsx"),
    route("/habit", "routes/_auth/habit.tsx"),
  ]),
] satisfies RouteConfig;
