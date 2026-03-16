import { useMemo } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

export function useRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = Object.fromEntries(searchParams.entries());

    return {
      asPath: `${location.pathname}${location.search}${location.hash}`,
      pathname: location.pathname,
      query,
      push: (to: string) => navigate({ to }),
      replace: (to: string) => navigate({ to, replace: true }),
    };
  }, [location.hash, location.pathname, location.search, navigate]);
}
