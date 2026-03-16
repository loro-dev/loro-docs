export function SiteFooter() {
  return (
    <footer className="site-footer border-t">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>Loro 2026 ©</div>
        <div className="flex items-center gap-4">
          <a href="/blog.xml" className="no-underline transition hover:text-white">
            Blog RSS
          </a>
          <a href="/changelog.xml" className="no-underline transition hover:text-white">
            Changelog RSS
          </a>
          <a
            href="https://discord.gg/tUsBSVfqzf"
            className="no-underline transition hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
