import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import { rendererRich, transformerTwoslash } from "@shikijs/twoslash";
import react from "@vitejs/plugin-react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite-plus";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function resolveFromRoot(...segments: string[]) {
  return path.resolve(rootDir, ...segments);
}

function startPreviewCompat() {
  return {
    name: "start-preview-compat",
    async closeBundle() {
      const distServerDir = resolveFromRoot("dist", "server");
      const compatPath = path.join(distServerDir, "server.js");
      const compatSource = `export { default } from "./server.mjs";\nexport * from "./server.mjs";\n`;
      await fs.mkdir(distServerDir, { recursive: true });
      await fs.writeFile(compatPath, compatSource, "utf8");
    },
  };
}

export default defineConfig({
  plugins: [
    mdx({
      include: ["**/*.md", "**/*.mdx"],
      remarkPlugins: [
        remarkFrontmatter,
        remarkGfm,
        [remarkMdxFrontmatter, { name: "frontmatter" }],
      ],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: "github-light",
            defaultLanguage: "ts",
            addLanguageClass: true,
            transformers: [
              transformerTwoslash({
                explicitTrigger: true,
                renderer: rendererRich(),
                throws: false,
              }),
            ],
          },
        ],
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: { className: ["heading-anchor"] },
          },
        ],
      ],
    }),
    wasm(),
    topLevelAwait(),
    tanstackStart(),
    startPreviewCompat(),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "next/link": resolveFromRoot("src/shims/next-link.tsx"),
      "next/image": resolveFromRoot("src/shims/next-image.tsx"),
      "next/router": resolveFromRoot("src/shims/next-router.tsx"),
      "next/dynamic": resolveFromRoot("src/shims/next-dynamic.tsx"),
      "nextra/components": resolveFromRoot("src/shims/nextra-components.tsx"),
    },
  },
});
