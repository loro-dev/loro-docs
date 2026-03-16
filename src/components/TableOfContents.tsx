import type { HeadingEntry } from "../generated/content-manifest";

export function TableOfContents({ headings }: { headings: HeadingEntry[] }) {
  if (headings.length === 0) return null;

  return (
    <aside className="hidden w-64 shrink-0 2xl:block">
      <div className="docs-toc sticky top-20 rounded-[1.75rem] p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
          On This Page
        </div>
        <div className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className="docs-toc-link block text-sm no-underline transition"
              style={{ marginLeft: (heading.depth - 2) * 10 }}
            >
              {heading.text}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
