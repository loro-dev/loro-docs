import { useEffect, useState } from "react";
import type { HeadingEntry } from "../generated/content-manifest";

export function TableOfContents({ headings }: { headings: HeadingEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <div className="sticky top-24">
        <div className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
          On this page
        </div>
        <ul className="space-y-0.5">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: (heading.depth - 2) * 12 }}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-1 px-2 text-[13px] leading-relaxed no-underline transition-colors ${
                  activeId === heading.id
                    ? "text-cyan-400 font-medium"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
