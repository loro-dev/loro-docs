import React from "react";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import Image from "next/image";
import Footer from "./components/landing/Footer";
import LanguageDropdown from "./components/LanguageDropdown";

const DEFAULT_TITLE = "Loro – Reimagine state management with CRDTs";
const DEFAULT_DESCRIPTION =
  "Loro is a high-performance CRDT library for building local-first, real-time collaborative apps — with rich text, movable trees, version control, and time travel.";
const DEFAULT_IMAGE = "https://loro.dev/og-image.jpg";

function formatPageTitle(metaTitle) {
  if (!metaTitle) return DEFAULT_TITLE;
  const trimmed = String(metaTitle).trim();
  if (/loro/i.test(trimmed)) return trimmed;
  if (/[–-]\s*loro$/i.test(trimmed)) return trimmed;
  return `${trimmed} – Loro`;
}

export default {
  logo: (
    <span
      className="flex"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      <Image
        src="/LORO_PURE.svg"
        alt="Logo"
        width={24}
        height={24}
        style={{ margin: "0 6px", display: "inline-block" }}
      />
      Loro
    </span>
  ),
  project: {
    link: "https://github.com/loro-dev/loro",
  },
  chat: {
    link: "https://discord.gg/tUsBSVfqzf",
  },
  navbar: {
    extraContent: <LanguageDropdown />,
  },
  docsRepositoryBase: "https://github.com/loro-dev/loro-docs/tree/main",
  footer: {
    text: "Loro 2024 ©",
    component: Footer,
  },
  head: () => {
    const config = useConfig();
    const { asPath } = useRouter();
    const rawPath =
      !asPath || asPath === "/"
        ? "/"
        : asPath.startsWith("/")
          ? asPath
          : `/${asPath}`;
    const normalizedPath = rawPath.split("#")[0] || "/";
    const canonicalUrl = `https://loro.dev${normalizedPath}`;
    const chineseUrl = `https://cn.loro.dev${normalizedPath}`;
    // Nextra v3 moves reserved fields like `title`, `description`, `image`
    // out of `frontMatter` into top-level config. Fallback to frontMatter for
    // older content that still sets them there.
    const metaTitle = config.title ?? config.frontMatter?.title;
    const metaDescription =
      config.description ?? config.frontMatter?.description ?? DEFAULT_DESCRIPTION;
    const metaImage = config.image ?? config.frontMatter?.image;
    const pageTitle = formatPageTitle(metaTitle);
    const ogImage = metaImage || DEFAULT_IMAGE;
    const ogType = normalizedPath.startsWith("/blog/")
      ? "article"
      : "website";

    return (
      <>
        <script
          async
          src="https://us.umami.is/script.js"
          data-website-id="5a4c9e46-22c9-46ee-82d8-901253485cf1"
        />
        <title>{pageTitle}</title>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site:domain" content="loro.dev" />
        <meta name="twitter:site" content="@loro_dev" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="apple-mobile-web-app-title" content="Loro" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="zh" href={chineseUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      </>
    );
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    return {
      titleTemplate: asPath === "/" ? "%s" : "%s – Loro",
    };
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: "dark",
  },
};
