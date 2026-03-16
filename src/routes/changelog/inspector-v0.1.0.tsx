import { createFileRoute } from "@tanstack/react-router";
import MdxPage from "../../../pages/changelog/inspector-v0.1.0.mdx";
import { ContentPage } from "../../components/ContentPage";
import { getContentEntry } from "../../generated/content-manifest";
import { buildRouteHead } from "../../lib/route-head";

const routePath = "/changelog/inspector-v0.1.0";

export const Route = createFileRoute("/changelog/inspector-v0/1/0")({
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
