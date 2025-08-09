# Repository Guidelines

## Project Structure & Module Organization
- `pages/`: Next.js pages and MDX docs (Nextra). Route files use kebab-case.
- `components/`: Reusable React components (PascalCase filenames).
- `lib/`: Local utilities/helpers imported by pages/components.
- `public/`: Static assets (images, favicons, robots, sitemap output).
- `.storybook/`: Storybook configuration and stories in `stories/`.
- `deno_scripts/`: Deno-based tooling and doc code-block tests.
- `styles/` and `style.css`: Global styles and Tailwind setup.

## Build, Test, and Development Commands
- `pnpm install`: Install dependencies (pnpm is required).
- `pnpm dev`: Run Next.js dev server.
- `pnpm build`: Generate RSS then build Next.js (`gen-rss.js`, `next build`).
- `pnpm start`: Serve the production build.
- `pnpm test`: Execute Deno-powered code-block tests across docs.
- `pnpm storybook` / `pnpm build-storybook`: Run/build Storybook.

## Coding Style & Naming Conventions
- Language: TypeScript + React (function components).
- Indentation: 2 spaces; keep files focused and small.
- Naming: PascalCase for components (`components/CodeBlock.tsx`), camelCase for vars, kebab-case routes (`pages/api/route-name.ts`).
- Styling: TailwindCSS utilities; prefer composable classes over custom CSS.
- Imports: Use module paths relative to file; docs code blocks may import from `loro-crdt` directly.

## Testing Guidelines
- Framework: Deno executes TS code blocks extracted from `.md|.mdx`.
- Run: `pnpm test` (or `cd deno_scripts && deno run -A run_code_blocks.ts ..`).
- Expectations: Use `expect` assertions where relevant in examples.
- Authoring docs: Ensure code blocks are self-contained TS snippets; they should compile and run without external context.

## Commit & Pull Request Guidelines
- Commits: Follow Conventional Commits (e.g., `docs: ...`, `fix: ...`, `feat: ...`, `test: ...`, `ui: ...`).
- PRs: Provide a clear summary, link related issues, include screenshots/gifs for UI/docs changes, and list test steps.
- Checks: Run `pnpm build` and `pnpm test` locally before requesting review.

## Security & Configuration Tips
- Node: Use the version compatible with Next 14; install via nvm.
- Secrets: Do not commit tokens or API keys; prefer env vars if needed.
