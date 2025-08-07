const { promises: fs } = require("fs");
const path = require("path");
const { Feed } = require("feed");
const matter = require("gray-matter");
const { marked } = require("marked");

async function generate() {
  const feed = new Feed({
    title: "Loro Changelog",
    description: "changelog of loro crdt",
    link: "https://loro.dev",
    feedLinks: "https://loro.dev/changelog.xml",
  });

  const posts = await fs.readdir(path.join(__dirname, "content", "changelog"));
  const items = await Promise.all(
    posts.map(async (name) => {
      if (name.endsWith(".json") || name.endsWith(".js")) return null;
      const content = await fs.readFile(
        path.join(__dirname, "content", "changelog", name)
      );

      const frontmatter = matter(content);
      const html = marked.parse(frontmatter.content);

      return {
        title: frontmatter.data.title,
        link: "/changelog/" + name.replace(/\.mdx?/, ""),
        date: new Date(frontmatter.data.date),
        content: html,
      };
    })
  );

  // Filter out null items and sort by date in descending order
  const sortedItems = items
    .filter(item => item !== null)
    .sort((a, b) => b.date - a.date);

  // Add sorted items to feed
  sortedItems.forEach(item => feed.addItem(item));

  await fs.writeFile("./public/changelog.xml", feed.rss2());
  console.log("generated changelog.xml");
}

generate();
