const { promises: fs } = require("fs");
const path = require("path");
const { Feed } = require("feed");
const matter = require("gray-matter");
const { marked } = require("marked");

const BASE_URL = "https://loro.dev";

const stripMdxComponents = (content) =>
  content
    .replace(/<([A-Z][A-Za-z0-9]*)[^>]*>([\s\S]*?)<\/\1>/g, "$2")
    .replace(/<([A-Z][A-Za-z0-9]*)[^>]*\/>/g, "");

async function collectEntries(directory) {
  const dirents = await fs.readdir(directory, { withFileTypes: true });

  const entries = await Promise.all(
    dirents.map(async (dirent) => {
      if (!dirent.isFile()) return null;
      if (!/\.mdx?$/.test(dirent.name)) return null;
      if (dirent.name.startsWith("_")) return null;

      const filePath = path.join(directory, dirent.name);
      const content = await fs.readFile(filePath, "utf8");
      const frontmatter = matter(content);
      const sanitizedBody = stripMdxComponents(frontmatter.content)
        .split("\n")
        .filter((line) => !line.trimStart().startsWith("import "))
        .join("\n")
        .trim();
      const html = marked.parse(sanitizedBody);

      return {
        frontmatter,
        html,
        slug: dirent.name.replace(/\.mdx?$/, ""),
      };
    })
  );

  return entries.filter(Boolean);
}

async function generateFeed({
  title,
  description,
  routePrefix,
  directory,
  output,
}) {
  const feed = new Feed({
    title,
    description,
    id: `${BASE_URL}${routePrefix}`,
    link: `${BASE_URL}${routePrefix}`,
    feedLinks: {
      rss2: `${BASE_URL}/${output}`,
    },
  });

  const entries = await collectEntries(directory);
  const items = entries
    .map(({ frontmatter, html, slug }) => {
      const date = frontmatter.data.date
        ? new Date(frontmatter.data.date)
        : undefined;

      return {
        title: frontmatter.data.title ?? slug,
        id: `${BASE_URL}${routePrefix}${slug}`,
        link: `${BASE_URL}${routePrefix}${slug}`,
        date,
        description: frontmatter.data.description,
        content: html,
      };
    })
    .filter((item) => item.date instanceof Date && !Number.isNaN(item.date));

  items
    .sort((a, b) => b.date - a.date)
    .forEach((item) => feed.addItem(item));

  const outputPath = path.join(__dirname, "public", output);
  await fs.writeFile(outputPath, feed.rss2());
  console.log(`generated ${output}`);
}

async function generate() {
  await generateFeed({
    title: "Loro Blog",
    description: "Updates and stories from the Loro team.",
    routePrefix: "/blog/",
    directory: path.join(__dirname, "pages", "blog"),
    output: "blog.xml",
  });

  await generateFeed({
    title: "Loro Changelog",
    description: "Changelog of Loro CRDT.",
    routePrefix: "/changelog/",
    directory: path.join(__dirname, "pages", "changelog"),
    output: "changelog.xml",
  });
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
