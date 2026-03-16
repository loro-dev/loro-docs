import { createFileRoute } from "@tanstack/react-router";
import MdxPage from "../../../../pages/docs/concepts/cursor_stable_positions.mdx";
import { ContentPage } from "../../../components/ContentPage";
import { getContentEntry } from "../../../generated/content-manifest";
import { buildRouteHead } from "../../../lib/route-head";

const routePath = "/docs/concepts/cursor_stable_positions";

export const Route = createFileRoute("/docs/concepts/cursor_stable_positions")({
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
