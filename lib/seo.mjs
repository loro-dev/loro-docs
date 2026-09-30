import chineseRoutes from "./chinese-routes.mjs";

const translatedPaths = new Set(chineseRoutes.routes);

/** Return a stable pathname for canonical URLs, without query or fragment. */
export function normalizePath(asPath = "/") {
  const pathname = (asPath || "/").split(/[?#]/)[0];
  const absolutePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return absolutePath.replace(/\/+$/, "") || "/";
}

export function hasChineseTranslation(asPath) {
  return translatedPaths.has(normalizePath(asPath));
}

export function getPageUrls(asPath) {
  const pathname = normalizePath(asPath);
  return {
    pathname,
    canonicalUrl: `https://loro.dev${pathname}`,
    chineseUrl: hasChineseTranslation(pathname)
      ? `https://cn.loro.dev${pathname}`
      : undefined,
  };
}
