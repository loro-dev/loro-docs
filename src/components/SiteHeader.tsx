import { Link, useLocation } from "@tanstack/react-router";
import LanguageDropdown from "../../components/LanguageDropdown";
import { Search } from "lucide-react";

function NavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const active =
    to === "/"
      ? location.pathname === "/"
      : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={`site-nav-link rounded-full px-3 py-2 text-sm font-medium transition ${
        active ? "is-active" : ""
      }`}
    >
      {children}
    </Link>
  );
}

function SearchButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/50 transition hover:border-white/20 hover:text-white/70"
    >
      <Search size={14} />
      <span className="hidden md:inline">Search documentation...</span>
      <span className="md:hidden">Search...</span>
      <kbd className="ml-2 hidden rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-mono text-white/40 lg:inline-block">
        Ctrl K
      </kbd>
    </button>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="site-brand flex items-center gap-2 no-underline">
          <img src="/LORO.svg" alt="Loro" width={28} height={28} />
          <span className="font-semibold">Loro</span>
        </Link>
        <nav className="ml-4 flex flex-wrap items-center gap-1" aria-label="Primary">
          <NavLink to="/docs/">Docs</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/changelog">Changelog</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <SearchButton />
          <a
            href="https://github.com/loro-dev/loro"
            className="site-nav-link rounded-full px-3 py-2 text-sm font-medium no-underline transition"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
}
