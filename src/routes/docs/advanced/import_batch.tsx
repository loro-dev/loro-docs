import { createFileRoute } from "@tanstack/react-router";
import MdxPage from "../../../../pages/docs/advanced/import_batch.mdx";
import { ContentPage } from "../../../components/ContentPage";
import { getContentEntry } from "../../../generated/content-manifest";
import { buildRouteHead } from "../../../lib/route-head";

const routePath = "/docs/advanced/import_batch";

export const Route = createFileRoute("/docs/advanced/import_batch")({
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
