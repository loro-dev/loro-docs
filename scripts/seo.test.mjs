import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import chineseRoutes from "../lib/chinese-routes.mjs";
import { getPageUrls, hasChineseTranslation, normalizePath } from "../lib/seo.mjs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("English document declares its language before client rendering", () => {
  assert.match(read("pages/_document.tsx"), /<Html\s+lang="en">/);
});

test("canonical paths exclude queries, fragments, and trailing slashes", () => {
  for (const path of [undefined, "", "/", "/?utm_source=test#top"]) {
    assert.equal(normalizePath(path), "/");
  }
  for (const path of ["docs/api/js", "/docs/api/js/", "/docs/api/js?utm_source=test#LoroDoc", "/docs/api/js#LoroDoc"]) {
    assert.equal(getPageUrls(path).canonicalUrl, "https://loro.dev/docs/api/js");
  }
});

test("only existing translations receive Chinese alternates", () => {
  assert.equal(getPageUrls("/docs/api/js?ref=test#intro").chineseUrl, "https://cn.loro.dev/docs/api/js");
  for (const path of ["/blog/crdt-is-not-enough", "/blog/mergeable-containers", "/changelog/v1.9.0", "/docs/advanced/jsonpath", "/new-untranslated-page"]) {
    assert.equal(hasChineseTranslation(path), false, path);
    assert.equal(getPageUrls(path).chineseUrl, undefined, path);
  }
  assert.equal(chineseRoutes.routes.length, new Set(chineseRoutes.routes).size);
  assert.ok(chineseRoutes.routes.every((path) => normalizePath(path) === path));
  assert.match(chineseRoutes.commit, /^[a-f0-9]{40}$/);
});

test("API helpers are outside the pages router and excluded from sitemaps", () => {
  for (const [oldName, component] of [["indent", "Indent"], ["method", "Method"]]) {
    assert.equal(existsSync(new URL(`pages/docs/api/${oldName}.jsx`, root)), false);
    assert.ok(existsSync(new URL(`components/api-reference/${component}.jsx`, root)));
    assert.ok(read("next-sitemap.config.js").includes(`/docs/api/${oldName}`));
    assert.ok(!read("public/sitemap-0.xml").includes(`/docs/api/${oldName}<`));
    assert.ok(!chineseRoutes.routes.includes(`/docs/api/${oldName}`));
  }
  const mdx = read("pages/docs/api/js.mdx");
  for (const match of mdx.matchAll(/import\s+(?:styles|Indent|Method)\s+from\s+"([^"]+)"/g)) {
    const imported = resolve(new URL("pages/docs/api/", root).pathname, match[1]);
    assert.ok(existsSync(imported) || existsSync(`${imported}.jsx`), match[1]);
  }
});

test("content does not contain nested URL schemes or punctuation inside known links", () => {
  const files = readdirSync(new URL("pages/", root), { recursive: true })
    .filter((path) => /\.(md|mdx)$/.test(path));
  for (const file of files) {
    const source = read(`pages/${file}`);
    assert.doesNotMatch(source, /https?:\/\/(?:github|twitter)\.com\/https?:\/\//, file);
    assert.doesNotMatch(source, /https:\/\/loro\.dev\/blog\/loro-richtext(?:。|%E3%80%82)/i, file);
  }
});
