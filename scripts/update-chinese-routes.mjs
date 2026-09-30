import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";

// Run after publishing translations: node scripts/update-chinese-routes.mjs ../loro-docs-zh
// Read a local checkout so building the site never needs a network request.
const source = process.argv[2];
if (!source) {
  throw new Error("Pass the path to a loro-dev/loro-docs-zh checkout.");
}
const checkout = resolve(source);
const pages = resolve(checkout, "pages");
const routes = readdirSync(pages, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
  .map((entry) => relative(pages, resolve(entry.parentPath ?? entry.path, entry.name)).split(sep).join("/"))
  .filter((path) => !path.split("/").some((part) => part.startsWith("_")))
  .map((path) => `/${path.replace(/\.(md|mdx)$/, "").replace(/(^|\/)index$/, "")}`.replace(/\/$/, "") || "/")
  .sort();
const manifest = {
  repository: "https://github.com/loro-dev/loro-docs-zh",
  commit: execFileSync("git", ["-C", checkout, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  routes,
};
writeFileSync(new URL("../lib/chinese-routes.mjs", import.meta.url),
  `// Chinese pages are maintained in a separate repository. Only advertise known translations.\n// Refresh with scripts/update-chinese-routes.mjs after those pages are published.\nexport default ${JSON.stringify(manifest, null, 2)};\n`);
console.log(`Recorded ${routes.length} Chinese routes at ${manifest.commit}.`);
