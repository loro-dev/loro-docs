import { lazy, Suspense } from "react";

type DynamicOptions = {
  ssr?: boolean;
  loading?: () => JSX.Element | null;
};

export default function dynamic<T extends Record<string, unknown>>(
  loader: () => Promise<T>,
  options?: DynamicOptions
) {
  const LazyComponent = lazy(async () => {
    const module = await loader();
    return { default: (module as { default: React.ComponentType }).default };
  });

  return function DynamicComponent(props: Record<string, unknown>) {
    if (options?.ssr === false && typeof window === "undefined") {
      return options.loading ? options.loading() : null;
    }

    return (
      <Suspense fallback={options?.loading ? options.loading() : null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
