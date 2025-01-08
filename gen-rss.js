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

  const posts = await fs.readdir(path.join(__dirname, "pages", "changelog"));
  await Promise.all(
    posts.map(async (name) => {
      if (name.endsWith(".json")) return;
      const content = await fs.readFile(
        path.join(__dirname, "pages", "changelog", name)
      );

      const frontmatter = matter(content);
      const html = marked.parse(frontmatter.content);

      feed.addItem({
        title: frontmatter.data.title,
        link: "/changelog/" + name.replace(/\.mdx?/, ""),
        date: new Date(frontmatter.data.date),
        content: html,
      });
    })
  );

  await fs.writeFile("./public/changelog.xml", feed.rss2());
  console.log("generated changelog.xml");
}

generate();
