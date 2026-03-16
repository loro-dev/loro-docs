"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";

import { cn } from "@/lib/utils/cn";

export function LucideLanguages(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE */}
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6"
      />
    </svg>
  );
}

const LANGUAGES = [
  { id: "en", label: "English", domain: "https://loro.dev" },
  { id: "zh", label: "中文", domain: "https://cn.loro.dev" },
] as const;

type LanguageId = (typeof LANGUAGES)[number]["id"];

function getInitialLanguage(): LanguageId {
  if (typeof window === "undefined") {
    return "en";
  }

  const host = window.location.hostname.toLowerCase();
  if (host === "cn.loro.dev" || host.endsWith(".cn.loro.dev")) {
    return "zh";
  }

  return "en";
}

function buildTargetUrl(domain: string) {
  if (typeof window === "undefined") {
    return domain;
  }

  const { pathname, search, hash } = window.location;
  return `${domain}${pathname}${search}${hash}`;
}

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<LanguageId>("en");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setActiveLanguage(getInitialLanguage());
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }, [clearCloseTimer]);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimer();
    setIsOpen(true);
  }, [clearCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const handleSelect = useCallback((language: LanguageId) => {
    const target = LANGUAGES.find((item) => item.id === language);
    if (!target) {
      return;
    }

    setActiveLanguage(language);
    setIsOpen(false);

    if (typeof window !== "undefined") {
      window.location.href = buildTargetUrl(target.domain);
    }
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/72 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Switch site language"
      >
        <LucideLanguages className="h-5 w-5" />
      </button>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "absolute right-0 mt-2 w-32 overflow-hidden rounded-2xl border border-white/10 bg-[#111a22] py-1 shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-opacity duration-150",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {LANGUAGES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={cn(
              "flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
              id === activeLanguage
                ? "bg-white/10 font-medium text-white"
                : "text-white/70 hover:bg-white/6 hover:text-white"
            )}
            onClick={() => handleSelect(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
