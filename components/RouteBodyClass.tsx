"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PLAIN_ROUTE_PATTERNS = [/^\/blog\/?$/, /^\/changelog\/?$/, /^\/about\/?$/];

export default function RouteBodyClass() {
  const pathname = usePathname();
  useEffect(() => {
    const isPlain = PLAIN_ROUTE_PATTERNS.some((re) => re.test(pathname));
    document.body.dataset.layout = isPlain ? "plain" : "docs";
  }, [pathname]);
  return null;
}
