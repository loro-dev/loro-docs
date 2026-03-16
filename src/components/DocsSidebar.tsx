import { Link, useLocation } from "@tanstack/react-router";
import type { DocsNavNode } from "../generated/content-manifest";

function SidebarNode({ node, depth = 0 }: { node: DocsNavNode; depth?: number }) {
  const location = useLocation();

  if (node.kind === "page") {
    const active = location.pathname === node.route;
    return (
      <Link
        to={node.route}
        className={`group flex items-center rounded-lg px-2.5 py-1.5 text-[13px] leading-5 no-underline transition ${
          active
            ? "bg-cyan-500/10 text-cyan-400 font-medium"
            : "text-white/60 hover:bg-white/[0.04] hover:text-white/90"
        }`}
        style={{ marginLeft: depth * 8 }}
      >
        {node.title}
      </Link>
    );
  }

  return (
    <div className="space-y-0.5">
      <div
        className="px-2.5 pt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/35"
        style={{ marginLeft: depth * 8 }}
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
    <aside className="hidden w-[260px] shrink-0 xl:block">
      <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <div className="space-y-1">
          {nodes.map((node) => (
            <SidebarNode key={`${node.kind}:${node.title}`} node={node} />
          ))}
        </div>
      </nav>
    </aside>
  );
}
