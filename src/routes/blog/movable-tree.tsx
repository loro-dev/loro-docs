import { createFileRoute } from "@tanstack/react-router";
import MdxPage from "../../../pages/blog/movable-tree.mdx";
import { ContentPage } from "../../components/ContentPage";
import { getContentEntry } from "../../generated/content-manifest";
import { buildRouteHead } from "../../lib/route-head";

const routePath = "/blog/movable-tree";

export const Route = createFileRoute("/blog/movable-tree")({
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
