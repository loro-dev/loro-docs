import { ReactNode } from "react";

import homeDe from "./de";
import homeEn from "./en";
import homeFr from "./fr";
import homeJa from "./ja";
import homeZh from "./zh";
import { HomeTranslation, RichTextSegment, SupportedLocale } from "./types";

export const HOME_TRANSLATION_VERSION = 1;

const translations: Record<SupportedLocale, HomeTranslation> = {
  en: homeEn,
  zh: homeZh,
  ja: homeJa,
  de: homeDe,
  fr: homeFr,
};

export const supportedLocales: SupportedLocale[] = [
  "en",
  "zh",
  "ja",
  "de",
  "fr",
];

export function getHomeTranslations(locale?: string): HomeTranslation {
  if (locale) {
    const normalized = locale.toLowerCase();
    if (normalized in translations) {
      return translations[normalized as SupportedLocale];
    }

    const base = normalized.split("-")[0] as SupportedLocale;
    if (base && base in translations) {
      return translations[base];
    }
  }

  return translations.en;
}

export type HomeRichText = RichTextSegment[];

export type RenderRichText = (segments: RichTextSegment[]) => ReactNode;

export type {
  SupportedLocale,
  HomeTranslation,
  RichTextSegment,
  SupportCardTranslation,
  BuildCardTranslation,
  FeatureTranslation,
} from "./types";
