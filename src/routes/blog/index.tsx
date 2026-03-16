import { createFileRoute } from "@tanstack/react-router";
import BlogPostCard from "../../../components/BlogPostCard";
import { blogEntries } from "../../generated/content-manifest";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [{ title: "Loro Blog - Loro" }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <div className="site-shell">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-10 border-b border-white/10 pb-8 text-center">
          <h1 className="m-0 text-4xl font-bold text-white">Loro Blog</h1>
          <div className="mt-4">
            <a
              href="/blog.xml"
              className="text-sm font-semibold text-sky-300 no-underline hover:text-sky-200"
            >
              Subscribe via RSS
            </a>
          </div>
        </div>
        <div>
          {blogEntries.map((entry) => (
            <BlogPostCard
              key={entry.route}
              page={{
                route: entry.route,
                name: entry.slug,
                meta: { title: entry.title },
                frontMatter: {
                  title: entry.title,
                  description: entry.description,
                  date: entry.date,
                  image: entry.image,
                },
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
