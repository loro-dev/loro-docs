# Loro Docs

The source code for https://loro.dev/

# Development

```bash
pnpm install
pnpm dev
```

## SEO checks and translations

- `pnpm test:seo` runs fast, dependency-free regression checks.
- `pnpm build` builds the site and sitemap and checks generated metadata before
  Cloudflare packaging. `pnpm test:seo:build` reruns those checks against the
  current build: canonical/hreflang tags, language navigation, article headings,
  and API components staying out of public routes.
- Chinese content lives in [loro-dev/loro-docs-zh](https://github.com/loro-dev/loro-docs-zh).
  `lib/chinese-routes.mjs` records the source commit and routes that can be
  advertised as translations. Untranslated pages do not emit a Chinese
  alternate, and their Chinese language-menu entry is disabled with an
  explanation. English canonical URLs always use `https://loro.dev`;
  Chinese pages use their own canonical URLs in the separate Chinese repo.
- After publishing new Chinese translations, check their public URLs and run
  `node scripts/update-chinese-routes.mjs ../loro-docs-zh` against that checkout.
  Review the route-list diff, then run both SEO checks above. The generator
  reads local Markdown/MDX route files; it makes no network calls at build time.
  Unknown new English pages are excluded until their translation is published.
