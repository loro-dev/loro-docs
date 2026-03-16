import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/advanced/op_and_change")({
  beforeLoad: () => {
    throw redirect({
      to: "/docs/concepts/operations_changes",
      statusCode: 301,
    });
  },
  component: () => null,
});
