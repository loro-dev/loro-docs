import { createFileRoute } from "@tanstack/react-router";
import MdxPage from "../../../../pages/docs/concepts/event_graph_walker.mdx";
import { ContentPage } from "../../../components/ContentPage";
import { getContentEntry } from "../../../generated/content-manifest";
import { buildRouteHead } from "../../../lib/route-head";

const routePath = "/docs/concepts/event_graph_walker";

export const Route = createFileRoute("/docs/concepts/event_graph_walker")({
  head: () => {
    const entry = getContentEntry(routePath);
    return entry ? buildRouteHead(entry) : {};
  },
  component: RouteComponent,
});

function RouteComponent() {
  const entry = getContentEntry(routePath);
  if (!entry) return null;

  return (
    <ContentPage entry={entry}>
      <MdxPage />
    </ContentPage>
  );
}
