import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true,
  staticImage: true,
  readingTime: true,
});

export default withNextra({
  i18n: {
    locales: ["en", "zh", "ja", "de", "fr"],
    defaultLocale: "en",
  },
    webpack(config, { isServer, dev }) {
      // Use the client static directory in the server bundle and prod mode
      // Fixes `Error occurred prerendering page "/"`
      config.output.webassemblyModuleFilename =
        isServer && !dev
          ? "../static/wasm/[modulehash].wasm"
          : "static/wasm/[modulehash].wasm";

      // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
      config.experiments = { ...config.experiments, asyncWebAssembly: true };
      // =========================================================================
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.(".svg")
      );

      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: /url/ }, // exclude if *.svg?url
          use: ["@svgr/webpack"],
        }
      );

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;
      return config;
    },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/tUsBSVfqzf",
        permanent: false,
      },
      {
        source: '/blog/loro-open-source',
        destination: '/blog/loro-now-open-source',
        permanent: true,
      },
      {
        source: '/docs/advanced/replayable_event_graph',
        destination: '/docs/advanced/event_graph_walker',
        permanent: true,
      },
      // Redirects for extracted concept documents
      {
        source: '/docs/advanced/doc_state_and_oplog',
        destination: '/docs/concepts/oplog_docstate',
        permanent: true,
      },
      {
        source: '/docs/advanced/op_and_change',
        destination: '/docs/concepts/operations_changes',
        permanent: true,
      },
      {
        source: '/docs/advanced/event_graph_walker',
        destination: '/docs/concepts/event_graph_walker',
        permanent: true,
      },
      {
        source: '/docs/advanced/shallow_snapshot',
        destination: '/docs/concepts/shallow_snapshots',
        permanent: true,
      },
    ]
  },
})
