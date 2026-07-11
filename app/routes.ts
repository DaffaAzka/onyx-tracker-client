import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/guest/layout.tsx", [
    index("routes/guest/home.tsx"),
    route("/sign-in", "routes/guest/sign-in.tsx"),
    route("/get-started", "routes/guest/get-started.tsx"),
  ]),

  layout("routes/auth/layout.tsx", [
    route("/home", "routes/auth/home.tsx"),
    route("/habit", "routes/auth/habit.tsx"),
  ]),
] satisfies RouteConfig;
