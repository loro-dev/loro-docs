import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { getPageUrls } from "../lib/seo.mjs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const routes = readdirSync(new URL("pages/", root), { recursive: true })
  .filter((path) => /\.(md|mdx)$/.test(path) && !path.split("/").some((part) => part.startsWith("_")))
  .map((path) => `/${path.replace(/\.(md|mdx)$/, "").replace(/(^|\/)index$/, "")}`.replace(/\/$/, "") || "/");

function links(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), value]))
  );
}

for (const route of routes) {
  test(`built metadata: ${route}`, () => {
    const html = read(`.next/server/pages${route === "/" ? "/index" : route}.html`);
    assert.match(html, /<html\b[^>]*\slang="en"(?:\s|>)/, "English pages must declare their document language");
    const tags = links(html);
    const { canonicalUrl, chineseUrl } = getPageUrls(route);
    assert.deepEqual(tags.filter((link) => link.rel === "canonical").map((link) => link.href), [canonicalUrl]);
    assert.deepEqual(tags.filter((link) => link.hreflang === "zh").map((link) => link.href), chineseUrl ? [chineseUrl] : []);
    assert.match(html, /<title>[^<]+<\/title>/);
    const chineseButton = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)]
      .find(([, , content]) => content.includes("中文"));
    assert.ok(chineseButton, "language menu must remain available");
    assert.equal(/\bdisabled(?:=|\s|$)/.test(chineseButton[1]), !chineseUrl);
  });
}

test("built routing manifest and sitemap do not publish API helper pages", () => {
  const manifest = JSON.parse(read(".next/server/pages-manifest.json"));
  for (const route of ["/docs/api/indent", "/docs/api/method"]) {
    assert.equal(manifest[route], undefined);
    assert.ok(!read("public/sitemap-0.xml").includes(`${route}<`));
  }
  assert.ok(manifest["/docs/api/js"]);
});


test("CRDT article renders a title, topic headings, and its own social image", () => {
  const html = read(".next/server/pages/blog/crdt-is-not-enough.html");
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok([...html.matchAll(/<h2\b/g)].length >= 10);
  assert.match(html, /property="og:image" content="https:\/\/loro\.dev\/images\/crdt-is-not-enough\.png"/);
});
