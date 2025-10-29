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
        className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-400 dark:hover:text-gray-100"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <LucideLanguages className="h-5 w-5" />
      </button>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "absolute right-0 mt-2 w-32 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg transition-opacity duration-150 dark:border-neutral-700 dark:bg-neutral-900",
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
                ? "bg-gray-100 font-medium text-gray-900 dark:bg-neutral-800 dark:text-gray-100"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-gray-100"
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
