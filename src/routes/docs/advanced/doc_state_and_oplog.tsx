import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/advanced/doc_state_and_oplog")({
  beforeLoad: () => {
    throw redirect({
      to: "/docs/concepts/oplog_docstate",
      statusCode: 301,
    });
  },
  component: () => null,
});
