import { createFileRoute } from "@tanstack/react-router";
import { changelogEntries } from "../../generated/content-manifest";

export const Route = createFileRoute("/changelog/")({
  head: () => ({
    meta: [{ title: "Loro Changelog - Loro" }],
  }),
  component: ChangelogIndexPage,
});

function ChangelogIndexPage() {
  return (
    <div className="site-shell">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-10 border-b border-white/10 pb-8 text-center">
          <h1 className="m-0 text-4xl font-bold text-white">Loro Changelog</h1>
          <div className="mt-4 space-y-2 text-white/70">
            <p>
              Subscribe via{" "}
              <a href="/changelog.xml" className="text-sky-300 no-underline">
                RSS
              </a>
            </p>
            <p>
              Or join our{" "}
              <a
                href="https://discord.gg/tUsBSVfqzf"
                className="text-sky-300 no-underline"
                target="_blank"
                rel="noreferrer"
              >
                Discord Community
              </a>
            </p>
          </div>
        </div>
        <div className="space-y-6">
          {changelogEntries.map((entry) => (
            <a
              key={entry.route}
              href={entry.route}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 text-white no-underline transition hover:bg-white/10"
            >
              <div className="text-sm text-white/45">{entry.date}</div>
              <h2 className="mt-2 text-2xl font-semibold">{entry.title}</h2>
              {entry.description ? (
                <p className="mt-3 text-white/65">{entry.description}</p>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
