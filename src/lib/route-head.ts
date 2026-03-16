import type { ContentEntry } from "../generated/content-manifest";

const DEFAULT_IMAGE = "https://i.ibb.co/T1x1bSf/IMG-8191.jpg";

export function buildRouteHead(entry: ContentEntry) {
  const canonicalUrl = `https://loro.dev${entry.route}`;
  const chineseUrl = `https://cn.loro.dev${entry.route}`;
  const pageTitle =
    entry.route === "/" ? "Loro" : `${entry.title} - Loro`;
  const description = entry.description || "Loro";
  const image = entry.image
    ? entry.image.startsWith("http")
      ? entry.image
      : `https://loro.dev${entry.image}`
    : DEFAULT_IMAGE;

  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: description },
      { name: "og:description", content: description },
      { property: "og:title", content: pageTitle },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image },
      { name: "twitter:site:domain", content: "loro.dev" },
      { name: "twitter:site", content: "@loro_dev" },
      { name: "twitter:url", content: canonicalUrl },
      { name: "apple-mobile-web-app-title", content: "Loro" },
      { name: "msapplication-TileColor", content: "#fff" },
      { name: "theme-color", content: "#fff" },
      { httpEquiv: "Content-Language", content: "en" },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl },
      { rel: "alternate", hrefLang: "en", href: canonicalUrl },
      { rel: "alternate", hrefLang: "zh", href: chineseUrl },
      { rel: "alternate", hrefLang: "x-default", href: canonicalUrl },
    ],
  };
}
