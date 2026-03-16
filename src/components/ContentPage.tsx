import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { ContentEntry } from "../generated/content-manifest";
import { docsNavTree } from "../generated/content-manifest";
import { DocsSidebar } from "./DocsSidebar";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TableOfContents } from "./TableOfContents";

function sectionLabel(entry: ContentEntry) {
  if (entry.kind === "blog") return "Blog";
  if (entry.kind === "changelog") return "Changelog";
  if (!entry.route.startsWith("/docs")) return "Page";
  if (entry.route === "/docs/") return "Docs";
  if (entry.route.startsWith("/docs/tutorial")) return "Tutorial";
  if (entry.route.startsWith("/docs/concepts")) return "Concepts";
  if (entry.route.startsWith("/docs/advanced")) return "Advanced Topics";
  if (entry.route.startsWith("/docs/performance")) return "Performance";
  if (entry.route.startsWith("/docs/api")) return "API Reference";
  if (entry.route.startsWith("/docs/examples")) return "Examples";
  if (entry.route.startsWith("/docs/llm")) return "LLM Resources";
  return "Docs";
}

export function ContentPage({
  entry,
  children,
}: {
  entry: ContentEntry;
  children: ReactNode;
}) {
  if (entry.layout === "raw") {
    return <>{children}</>;
  }

  const body = (
    <article
      id="content"
      className="docs-article content-prose min-w-0 flex-1 p-6 sm:p-8 lg:p-10"
    >
      {entry.title ? (
        <header className="docs-hero mb-10 border-b border-white/[0.08] pb-8">
          {entry.kind === "docs" && (
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-white/40">
              {sectionLabel(entry)}
            </div>
          )}
          <h1 className="m-0 text-3xl font-semibold tracking-tight text-white">
            {entry.title}
          </h1>
          {entry.description ? (
            <p className="docs-lead mt-4 max-w-3xl text-base text-white/60">
              {entry.description}
            </p>
          ) : null}
        </header>
      ) : null}
      <main>{children}</main>
      {entry.kind === "docs" && (entry.prevRoute || entry.nextRoute) ? (
        <nav className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-8 sm:flex-row sm:justify-between">
          {entry.prevRoute ? (
            <Link
              to={entry.prevRoute}
              className="docs-nav-card no-underline"
            >
              ← {entry.prevTitle}
            </Link>
          ) : (
            <span />
          )}
          {entry.nextRoute ? (
            <Link
              to={entry.nextRoute}
              className="docs-nav-card text-right no-underline"
            >
              {entry.nextTitle} →
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );

  return (
    <div
      className={`site-shell ${
        entry.kind === "docs" ? "site-shell--docs" : "site-shell--content"
      }`}
    >
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <div className="site-frame mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {entry.kind === "docs" ? (
          <div className="docs-layout flex gap-8">
            <DocsSidebar nodes={docsNavTree} />
            {body}
            <TableOfContents headings={entry.headings} />
          </div>
        ) : (
          <div className="mx-auto max-w-5xl">{body}</div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
