import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/advanced/event_graph_walker")({
  beforeLoad: () => {
    throw redirect({
      to: "/docs/concepts/event_graph_walker",
      statusCode: 301,
    });
  },
  component: () => null,
});
