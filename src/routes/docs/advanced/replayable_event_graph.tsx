import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/advanced/replayable_event_graph")({
  beforeLoad: () => {
    throw redirect({
      to: "/docs/advanced/event_graph_walker",
      statusCode: 301,
    });
  },
  component: () => null,
});
