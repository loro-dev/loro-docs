import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/loro-open-source")({
  beforeLoad: () => {
    throw redirect({
      to: "/blog/loro-now-open-source",
      statusCode: 301,
    });
  },
  component: () => null,
});
