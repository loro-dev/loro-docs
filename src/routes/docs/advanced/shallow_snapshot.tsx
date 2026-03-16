import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/advanced/shallow_snapshot")({
  beforeLoad: () => {
    throw redirect({
      to: "/docs/concepts/shallow_snapshots",
      statusCode: 301,
    });
  },
  component: () => null,
});
