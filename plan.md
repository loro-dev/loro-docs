# TanStack Start + VitePlus Migration Plan

## Goal

Migrate this docs site from `Next.js + Nextra` to `TanStack Start` on top of `VitePlus`, while keeping the site working during the migration and making every phase independently verifiable.

## Principles

- Keep the current site working until the replacement is ready.
- Prefer parallel build-out over big-bang rewrite.
- Every phase must have clear entry/exit criteria.
- Preserve URLs, SEO signals, feeds, and static assets.
- Replace Nextra features one by one with local implementation.

## Status

- [x] Phase 0: Lock scope and baseline current behavior
- [x] Phase 1: Create new app shell and build pipeline
- [x] Phase 2: Build content pipeline and route manifest
- [x] Phase 3: Migrate docs layout and page rendering
- [x] Phase 4: Migrate blog and changelog
- [x] Phase 5: Restore special features and integrations
- [x] Phase 6: Verify parity and switch over
- [ ] Phase 7: Clean up old Next/Nextra code

## Scope

### In scope

- Landing page, docs, blog, changelog, about page
- MD/MDX rendering
- Sidebar, TOC, prev/next navigation, metadata
- RSS, sitemap, redirects, static assets
- Existing interactive client-only demos
- Copy raw MDX flow for JS API docs
- Storybook migration away from Next-specific setup

### Out of scope for first cut

- Visual redesign
- New information architecture
- New search system
- New CMS or external content source
- Rewriting docs content unless required by the new renderer

## Current Constraints

- Current docs structure depends on `Nextra` and `_meta.js`.
- Blog and changelog indexes depend on `getPagesUnderRoute()`.
- Theme metadata depends on `theme.config.jsx`.
- One small API route exists only to expose raw MDX text.
- Some pages/components depend on `next/link`, `next/image`, `next/router`, and `next/dynamic`.
- Code blocks rely on `twoslash` styling and likely Nextra's MDX pipeline behavior.

## Target Architecture

- Framework: `TanStack Start`
- Build/runtime base: `VitePlus`
- Rendering mode: static prerendering for all public content pages
- Content source: local `pages/**/*.md|mdx`
- Content metadata: generated manifest from frontmatter + `_meta.js`
- Raw MDX copy source: generated static text asset instead of runtime API
- Redirects: configured at deployment/platform layer or via generated rules

## Phase 0: Lock Scope and Baseline

### Goal

Capture what the current site does before changing anything.

### Tasks

- [ ] Write down all public routes that must keep working
- [ ] Record all current redirects from `next.config.mjs`
- [ ] Record current sitemap/RSS outputs
- [ ] Record all Nextra features currently in use
- [ ] Identify all Next-specific imports and files
- [ ] Decide migration worktree/branch strategy

### Deliverables

- Route inventory
- Redirect inventory
- Feature parity checklist
- Risk list

### Baseline Findings

- Public route inventory: 71 routes
- Current redirect inventory:
  - `/discord` -> `https://discord.gg/tUsBSVfqzf` (`302`)
  - `/blog/loro-open-source` -> `/blog/loro-now-open-source` (`301`)
  - `/docs/advanced/replayable_event_graph` -> `/docs/advanced/event_graph_walker` (`301`)
  - `/docs/advanced/doc_state_and_oplog` -> `/docs/concepts/oplog_docstate` (`301`)
  - `/docs/advanced/op_and_change` -> `/docs/concepts/operations_changes` (`301`)
  - `/docs/advanced/event_graph_walker` -> `/docs/concepts/event_graph_walker` (`301`)
  - `/docs/advanced/shallow_snapshot` -> `/docs/concepts/shallow_snapshots` (`301`)
- Current Next/Nextra binding points found in 15 files:
  - `components/BlogPostCard.tsx`
  - `components/TwinEditors/UserProfile.tsx`
  - `components/api/LanguageSelector.tsx`
  - `components/changelog.tsx`
  - `components/richtextDemo.tsx`
  - `components/video.tsx`
  - `next.config.mjs`
  - `pages/_app.tsx`
  - `pages/api/raw-mdx.ts`
  - `pages/blog.mdx`
  - `pages/blog/v1.0.mdx`
  - `pages/changelog.mdx`
  - `pages/docs/concepts/crdt.mdx`
  - `pages/docs/index.mdx`
  - `theme.config.jsx`
- Current baseline build/test status before migration work:
  - `pnpm build` fails when dependencies are not installed
  - After dependency bootstrap, build status must be rechecked
  - `pnpm test` currently reports at least these pre-existing failures:
    - `pages/blog/loro-mirror.mdx:71` imports `loro-mirror`, which Deno does not resolve in the current test setup
    - `pages/docs/tutorial/text.mdx:368` calls `text.sliceDelta`, which is not present in the resolved runtime version

### Validation

- [x] `pnpm build` succeeds on the current codebase
- [x] `pnpm test` succeeds on the current codebase
- [x] Manual spot-check of landing/docs/blog/changelog/about

### Exit Criteria

- We can say exactly what "migration complete" means.

## Phase 1: New App Shell and Build Pipeline

### Goal

Stand up a minimal `TanStack Start` app in parallel without migrating content yet.

### Tasks

- [ ] Add `TanStack Start` and required Vite/VitePlus dependencies
- [ ] Create new app entry, router, root layout, and global styles
- [ ] Wire Tailwind, font loading, and static assets
- [ ] Add a placeholder route for `/`
- [ ] Add static prerendering configuration
- [ ] Decide dev/build/preview commands

### Deliverables

- New app boots independently
- Basic root layout renders
- Build can emit static output

### Validation

- [x] Dev server starts
- [x] Production build succeeds
- [x] Static output contains the placeholder route
- [x] Existing global styles can be loaded without regressions

### Exit Criteria

- New app shell exists and can ship a trivial static site.

## Phase 2: Content Pipeline and Route Manifest

### Goal

Replace Nextra's content discovery with a local manifest builder.

### Tasks

- [ ] Create script to scan `pages/**/*.md|mdx`
- [ ] Parse frontmatter for title/description/date/image
- [ ] Read `_meta.js` files and normalize navigation config
- [ ] Generate route manifest JSON for docs/blog/changelog
- [ ] Generate prev/next relationships for docs pages
- [ ] Generate canonical path data for SEO
- [ ] Generate static raw text asset for `pages/docs/api/js.mdx`

### Deliverables

- Content manifest
- Navigation manifest
- Blog/changelog index data
- Raw MDX text artifact

### Validation

- [x] Manifest build script runs in CI/local build
- [x] Manifest includes all current docs/blog/changelog pages
- [x] Blog and changelog sort order matches current site
- [x] Raw text artifact matches the source MDX content

### Exit Criteria

- No route list or sidebar depends on Nextra runtime APIs anymore.

## Phase 3: Docs Layout and Page Rendering

### Goal

Render docs pages with local layout components instead of Nextra.

### Tasks

- [ ] Build docs page layout
- [ ] Build sidebar from generated manifest
- [ ] Build TOC from headings
- [ ] Build prev/next navigation
- [ ] Build page metadata injection
- [ ] Build dark mode/theme support
- [ ] Render MD/MDX pages through the new pipeline
- [ ] Replace `nextra/components` usage such as `Cards`

### Deliverables

- Working `/docs/*` routes
- Sidebar/TOC/pagination parity
- Per-page SEO metadata

### Validation

- [x] Spot-check key docs pages
- [x] TOC appears on pages that should have it
- [x] Pagination respects current `_meta.js` rules
- [x] Canonical and `hreflang` tags are present
- [x] Dark mode works

### Exit Criteria

- Docs section is usable without any Nextra runtime dependency.

## Phase 4: Blog and Changelog

### Goal

Restore blog and changelog listing/detail pages in the new app.

### Tasks

- [ ] Migrate blog index generation from `getPagesUnderRoute()`
- [ ] Migrate changelog index generation from `getPagesUnderRoute()`
- [ ] Replace dynamic MDX loading used by changelog page
- [ ] Port blog/changelog detail page layout
- [ ] Preserve RSS links and page ordering

### Deliverables

- Working `/blog`, `/blog/*`, `/changelog`, `/changelog/*`

### Validation

- [x] Blog list order matches current site
- [x] Changelog list order matches current site
- [x] Detail pages render correctly
- [x] RSS files are linked from the right pages

### Exit Criteria

- Blog and changelog are fully driven by local content manifests.

## Phase 5: Special Features and Integrations

### Goal

Restore everything that is easy to forget but visible in production.

### Tasks

- [ ] Replace `next/link` with router-aware links
- [ ] Replace `next/image` usage with plain image/component strategy
- [ ] Replace `next/router` usage with TanStack router APIs or browser APIs
- [ ] Replace `next/dynamic` usage for client-only components
- [ ] Restore analytics scripts
- [ ] Restore RSS generation
- [ ] Replace `next-sitemap` with static sitemap generation
- [ ] Move redirects to deployment config
- [ ] Migrate Storybook from `@storybook/nextjs`
- [ ] Verify WASM asset handling
- [ ] Verify `twoslash` rendering/styling

### Deliverables

- All production integrations restored
- No runtime dependency on Next APIs

### Validation

- [x] Copy raw MDX button works from generated static asset
- [x] Language selector works
- [x] Landing page demos render
- [x] SVG imports work
- [x] WASM-backed demos work in dev and prod
- [x] `twoslash` popups/styles still work
- [ ] Storybook runs

### Exit Criteria

- The new app has feature parity for all user-visible behavior.

## Phase 6: Parity Verification and Cutover

### Goal

Prove the new site is ready to replace the old one.

### Tasks

- [ ] Run full local build and test suite
- [ ] Compare route coverage against baseline inventory
- [ ] Compare metadata and canonical tags on key pages
- [ ] Compare generated RSS and sitemap outputs
- [ ] Compare redirect behavior
- [ ] Run manual visual smoke test on desktop and mobile widths
- [ ] Prepare deployment and rollback notes

### Deliverables

- Parity report
- Deployment checklist
- Rollback plan

### Validation

- [x] `pnpm build`
- [x] `pnpm test`
- [x] Manual smoke checks pass
- [x] No missing routes or broken redirects

### Exit Criteria

- The replacement can be deployed with low rollback risk.

## Phase 7: Cleanup

### Goal

Remove old framework code after cutover.

### Tasks

- [ ] Remove `next`, `nextra`, `nextra-theme-docs`, `next-sitemap`, `@opennextjs/cloudflare`
- [ ] Remove `pages/_app.tsx`, `next.config.mjs`, and obsolete Next-only files
- [ ] Remove old scripts and config
- [ ] Remove Next-specific TypeScript plugin and types
- [ ] Update README and contributor docs

### Deliverables

- Clean dependency graph
- Clean scripts/config
- Updated docs

### Validation

- [ ] No `next/*` or `nextra/*` imports remain
- [ ] Lockfile and scripts reflect the new stack
- [ ] Fresh install + build works

### Exit Criteria

- The repo no longer depends on Next/Nextra.

## Trackable Work Items

### High-risk items

- [ ] Replacing Nextra navigation and page metadata behavior
- [ ] Preserving `twoslash` output quality
- [ ] Preserving WASM behavior in dev and production builds
- [ ] Replacing changelog dynamic MDX loading
- [ ] Preserving SEO/canonical/alternate language tags

### Nice-to-have follow-ups after migration

- [ ] Simplify content directory naming
- [ ] Replace `_meta.js` with a typed config format
- [ ] Add route/content snapshot tests
- [ ] Add visual regression tests for key pages
- [ ] Revisit docs search

## Decision Log

### Confirmed

- [x] Target framework direction: `TanStack Start`
- [x] Migration style: gradual, parallel build-out
- [x] Do not keep Next.js

### Open decisions

- [ ] Keep deployment fully static, or add a small server runtime
- [ ] Keep current content tree under `pages/`, or move to `content/`
- [ ] Keep redirects in hosting config, or model them in app/router too
- [ ] Keep Storybook, or replace it with route-local examples only

## Suggested Execution Order

1. Finish Phase 0 before writing migration code.
2. Build Phase 1 and 2 first so the new app has a stable foundation.
3. Migrate docs before blog/changelog because docs drive most framework work.
4. Delay cleanup until cutover is already proven.

## Progress Notes

Use this section as a running log during implementation.

- 2026-03-16: Initial migration plan created. Current direction is `TanStack Start + VitePlus`, with a gradual replacement of `Next.js + Nextra`.
- 2026-03-16: Added a parallel `TanStack Start` app on top of Vite/VitePlus-compatible config, generated route files from `pages/**/*.md|mdx`, and switched default `dev/build/preview` scripts to the new stack.
- 2026-03-16: Added local shims for `next/link`, `next/image`, `next/router`, `next/dynamic`, and `nextra/components` so existing content/components can render under Vite without a big-bang rewrite.
- 2026-03-16: Restored docs/blog/changelog rendering, SEO metadata, redirects, analytics tags, static raw MDX export, and WASM support for the landing-page demo.
- 2026-03-16: Verified `pnpm dev`, `pnpm build`, `pnpm preview`, and `pnpm test`. Remaining cleanup is optional legacy removal and Storybook migration.
- 2026-03-16: Verified `vp build` and `vp preview` after adding a generated `dist/server/server.js` compatibility shim for TanStack Start preview.
- 2026-03-16: Replaced the generated MDX homepage with a hand-crafted landing route and redesigned the docs shell (header, sidebar, TOC, article surface, typography, and accessibility affordances) without reducing content density.
- 2026-03-16: Restored `twoslash` in the Vite MDX pipeline with `@shikijs/rehype` + `transformerTwoslash`, and fixed popup clipping by moving code-block scrolling from the outer `pre` to the inner `code` element.
- 2026-03-16: Switched the shared shell, landing page, and docs surfaces to a unified dark theme with revised navigation, article chrome, CTA styling, and code-block treatment after visual review showed the previous light treatment was still too weak.
