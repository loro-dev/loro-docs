import { Link, useLocation } from "@tanstack/react-router";
import type { DocsNavNode } from "../generated/content-manifest";

function SidebarNode({ node, depth = 0 }: { node: DocsNavNode; depth?: number }) {
  const location = useLocation();

  if (node.kind === "page") {
    const active = location.pathname === node.route;
    return (
      <Link
        to={node.route}
        className={`docs-sidebar-link block rounded-xl px-3 py-2 text-sm no-underline transition ${
          active ? "is-active" : ""
        }`}
        style={{ marginLeft: depth * 10 }}
      >
        {node.title}
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <div
        className="docs-sidebar-section px-3 pt-4 text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ marginLeft: depth * 10 }}
      >
        {node.title}
      </div>
      {node.children.map((child) => (
        <SidebarNode
          key={`${node.title}:${child.title}`}
          node={child}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export function DocsSidebar({ nodes }: { nodes: DocsNavNode[] }) {
  return (
    <aside className="hidden w-[18.5rem] shrink-0 xl:block">
      <div className="docs-sidebar sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[1.75rem] p-4">
        {nodes.map((node) => (
          <SidebarNode key={`${node.kind}:${node.title}`} node={node} />
        ))}
      </div>
    </aside>
  );
}
