import { createFileRoute } from "@tanstack/react-router";
import MdxPage from "../../../../pages/docs/advanced/undo.mdx";
import { ContentPage } from "../../../components/ContentPage";
import { getContentEntry } from "../../../generated/content-manifest";
import { buildRouteHead } from "../../../lib/route-head";

const routePath = "/docs/advanced/undo";

export const Route = createFileRoute("/docs/advanced/undo")({
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
