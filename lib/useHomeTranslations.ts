import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  SupportedLocale,
  getHomeTranslations,
  supportedLocales,
} from "./home-translations";

function resolveLocale(locale: string | undefined, asPath: string | undefined) {
  if (locale) {
    return locale;
  }

  if (!asPath) {
    return undefined;
  }

  const normalizedPath = asPath.split("?")[0] ?? "";
  const segments = normalizedPath.split("/").filter(Boolean);
  const first = segments[0];
  return first ? first.toLowerCase() : undefined;
}

export function useHomeTranslations() {
  const { locale, asPath } = useRouter();

  return useMemo(() => {
    const candidate = resolveLocale(locale, asPath);
    if (candidate && isSupportedLocale(candidate)) {
      return getHomeTranslations(candidate);
    }

    return getHomeTranslations(undefined);
  }, [locale, asPath]);
}

function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale);
}
