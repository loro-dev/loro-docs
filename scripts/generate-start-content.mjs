import { promises as fs } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import matter from "gray-matter";

const rootDir = process.cwd();
const pagesDir = path.join(rootDir, "pages");
const outputDir = path.join(rootDir, "src", "generated");
const routesDir = path.join(rootDir, "src", "routes");
const rawDir = path.join(rootDir, "public", "raw");

const specialPageFiles = new Set([
  "pages/index.mdx",
  "pages/blog.mdx",
  "pages/changelog.mdx",
]);

function posixify(value) {
  return value.split(path.sep).join("/");
}

function slugifyHeading(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function walk(dirPath) {
  const dirents = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const fullPath = path.join(dirPath, dirent.name);
      if (dirent.isDirectory()) return walk(fullPath);
      return fullPath;
    })
  );
  return files.flat();
}

async function loadMetaObject(filePath) {
  if (!(await exists(filePath))) return {};
  const source = await fs.readFile(filePath, "utf8");
  const transformed = source.replace(/export default/, "module.exports =");
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(transformed, sandbox, { filename: filePath });
  return sandbox.module.exports || {};
}

function routeFromPageFile(relativePath) {
  let route = `/${posixify(relativePath).replace(/^pages\//, "")}`;
  route = route.replace(/\/index\.(md|mdx)$/, "/");
  route = route.replace(/\.(md|mdx)$/, "");
  if (route === "/index") return "/";
  return route;
}

function filePathFromRoute(route) {
  if (route === "/") return path.join(routesDir, "index.tsx");
  const trimmed = route.endsWith("/") ? route.slice(0, -1) : route;
  const parts = trimmed.replace(/^\//, "").split("/");
  if (route.endsWith("/")) {
    return path.join(routesDir, ...parts, "index.tsx");
  }
  return path.join(routesDir, ...parts) + ".tsx";
}

function headingEntries(markdown) {
  const headings = [];
  const seen = new Map();
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,4})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].replace(/\{#.+\}$/, "").trim();
    let id = slugifyHeading(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    headings.push({ depth, text, id });
  }
  return headings;
}

function serialize(value) {
  return JSON.stringify(value, null, 2);
}

function flattenDocsPages(nodes, pages = []) {
  for (const node of nodes) {
    if (node.kind === "page") {
      pages.push(node);
      continue;
    }
    flattenDocsPages(node.children, pages);
  }
  return pages;
}

async function buildDocsNav(entriesByRoute, currentDir, routePrefix) {
  const meta = await loadMetaObject(path.join(currentDir, "_meta.js"));
  const nav = [];

  for (const [key, rawValue] of Object.entries(meta)) {
    const value =
      typeof rawValue === "string"
        ? { title: rawValue }
        : rawValue && typeof rawValue === "object"
          ? rawValue
          : {};
    const pageCandidates = [".mdx", ".md"].map((ext) => path.join(currentDir, `${key}${ext}`));
    const folderPath = path.join(currentDir, key);
    const pagePath = pageCandidates.find((candidate) => entriesByRoute.has(routeFromPageFile(posixify(path.relative(rootDir, candidate)))));

    if (pagePath) {
      const route = routeFromPageFile(posixify(path.relative(rootDir, pagePath)));
      const entry = entriesByRoute.get(route);
      nav.push({
        kind: "page",
        title: value.title || entry?.title || key,
        route,
      });
      continue;
    }

    if (await exists(folderPath)) {
      const children = await buildDocsNav(entriesByRoute, folderPath, `${routePrefix}/${key}`);
      nav.push({
        kind: "section",
        title: value.title || key,
        route: null,
        children,
      });
    }
  }

  return nav;
}

function getPrevNextForDocs(navTree) {
  const pages = flattenDocsPages(navTree);
  const map = new Map();
  for (const [index, page] of pages.entries()) {
    map.set(page.route, {
      prevRoute: pages[index - 1]?.route ?? null,
      prevTitle: pages[index - 1]?.title ?? null,
      nextRoute: pages[index + 1]?.route ?? null,
      nextTitle: pages[index + 1]?.title ?? null,
    });
  }
  return map;
}

async function writeGeneratedRoute(entry) {
  const routeFile = filePathFromRoute(entry.route);
  const relativeImportToPage = posixify(
    path.relative(path.dirname(routeFile), path.join(rootDir, entry.sourcePath))
  );
  const relativeImportToManifest = posixify(
    path.relative(path.dirname(routeFile), path.join(rootDir, "src/generated/content-manifest"))
  );
  const relativeImportToPageComponent = posixify(
    path.relative(path.dirname(routeFile), path.join(rootDir, "src/components/ContentPage"))
  );
  const relativeImportToHead = posixify(
    path.relative(path.dirname(routeFile), path.join(rootDir, "src/lib/route-head"))
  );

  const content = `import { createFileRoute } from "@tanstack/react-router";
import MdxPage from "${relativeImportToPage.startsWith(".") ? relativeImportToPage : `./${relativeImportToPage}`}";
import { ContentPage } from "${relativeImportToPageComponent.startsWith(".") ? relativeImportToPageComponent : `./${relativeImportToPageComponent}`}";
import { getContentEntry } from "${relativeImportToManifest.startsWith(".") ? relativeImportToManifest : `./${relativeImportToManifest}`}";
import { buildRouteHead } from "${relativeImportToHead.startsWith(".") ? relativeImportToHead : `./${relativeImportToHead}`}";

const routePath = ${JSON.stringify(entry.route)};

export const Route = createFileRoute(${JSON.stringify(entry.route)})({
  head: () => {
    const entry = getContentEntry(routePath);
    return entry ? buildRouteHead(entry) : {};
  },
  component: RouteComponent,
});

function RouteComponent() {
  const entry = getContentEntry(routePath);
  if (!entry) return null;

  return (
    <ContentPage entry={entry}>
      <MdxPage />
    </ContentPage>
  );
}
`;

  await ensureDir(path.dirname(routeFile));
  await fs.writeFile(routeFile, content);
}

async function main() {
  const allFiles = await walk(pagesDir);
  const pageFiles = allFiles
    .filter((filePath) => /\.(md|mdx)$/.test(filePath))
    .filter((filePath) => !path.basename(filePath).startsWith("_"));

  const entries = [];

  for (const filePath of pageFiles) {
    const relativePath = posixify(path.relative(rootDir, filePath));
    if (specialPageFiles.has(relativePath)) continue;

    const route = routeFromPageFile(relativePath);
    const source = await fs.readFile(filePath, "utf8");
    const parsed = matter(source);
    const folderMetaPath = path.join(path.dirname(filePath), "_meta.js");
    const folderMeta = await loadMetaObject(folderMetaPath);
    const slug = path.basename(filePath).replace(/\.(md|mdx)$/, "");
    const folderMetaValue = folderMeta[slug];
    const folderMetaTheme =
      folderMetaValue && typeof folderMetaValue === "object"
        ? folderMetaValue.theme || {}
        : {};
    const rootMeta = route === "/" ? await loadMetaObject(path.join(pagesDir, "_meta.js")) : null;
    const rootMetaTheme =
      route === "/" && rootMeta?.index?.theme ? rootMeta.index.theme : {};

    entries.push({
      route,
      slug,
      sourcePath: relativePath,
      title:
        parsed.data.title ||
        (typeof folderMetaValue === "string" ? folderMetaValue : folderMetaValue?.title) ||
        slug,
      description: parsed.data.description || "",
      date: parsed.data.date || null,
      image: parsed.data.image || null,
      headings: headingEntries(parsed.content),
      kind:
        route === "/"
          ? "page"
          : route.startsWith("/docs/")
            ? "docs"
            : route === "/docs/"
              ? "docs"
              : route.startsWith("/blog/")
                ? "blog"
                : route.startsWith("/changelog/")
                  ? "changelog"
                  : "page",
      tocEnabled:
        folderMetaTheme.toc === false || rootMetaTheme.toc === false ? false : true,
      paginationEnabled:
        folderMetaTheme.pagination === false || rootMetaTheme.pagination === false
          ? false
          : true,
      layout: rootMetaTheme.layout === "raw" ? "raw" : "default",
      prevRoute: null,
      prevTitle: null,
      nextRoute: null,
      nextTitle: null,
    });
  }

  const entriesByRoute = new Map(entries.map((entry) => [entry.route, entry]));
  const docsNavTree = await buildDocsNav(entriesByRoute, path.join(pagesDir, "docs"), "/docs");
  const docsPrevNext = getPrevNextForDocs(docsNavTree);

  for (const entry of entries) {
    if (entry.kind !== "docs" || !entry.paginationEnabled) continue;
    const prevNext = docsPrevNext.get(entry.route);
    if (!prevNext) continue;
    Object.assign(entry, prevNext);
  }

  const blogEntries = entries
    .filter((entry) => entry.kind === "blog")
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  const changelogEntries = entries
    .filter((entry) => entry.kind === "changelog")
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  const contentModule = `export type HeadingEntry = {
  depth: number;
  text: string;
  id: string;
};

export type ContentKind = "page" | "docs" | "blog" | "changelog";

export type ContentEntry = {
  route: string;
  slug: string;
  sourcePath: string;
  title: string;
  description: string;
  date: string | null;
  image: string | null;
  headings: HeadingEntry[];
  kind: ContentKind;
  tocEnabled: boolean;
  paginationEnabled: boolean;
  layout: "raw" | "default";
  prevRoute: string | null;
  prevTitle: string | null;
  nextRoute: string | null;
  nextTitle: string | null;
};

export type DocsNavNode =
  | { kind: "page"; title: string; route: string }
  | { kind: "section"; title: string; route: null; children: DocsNavNode[] };

export const contentEntries: Record<string, ContentEntry> = ${serialize(
    Object.fromEntries(entries.map((entry) => [entry.route, entry]))
  )};

export const blogEntries: ContentEntry[] = ${serialize(blogEntries)};

export const changelogEntries: ContentEntry[] = ${serialize(changelogEntries)};

export const docsNavTree: DocsNavNode[] = ${serialize(docsNavTree)};

export function getContentEntry(route: string): ContentEntry | null {
  return contentEntries[route] ?? null;
}
`;

  await ensureDir(outputDir);
  await fs.writeFile(path.join(outputDir, "content-manifest.ts"), contentModule);

  await ensureDir(rawDir);
  await fs.copyFile(
    path.join(pagesDir, "docs", "api", "js.mdx"),
    path.join(rawDir, "js_api.mdx.txt")
  );

  for (const entry of entries) {
    await writeGeneratedRoute(entry);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
