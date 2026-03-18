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
  ]),
] satisfies RouteConfig;
