import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  staticImage: true,
  readingTime: true,
});

export default withNextra({
  output: "standalone",
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
    // Replace Next.js's default SVG handling with @svgr/webpack so that
    // `import Foo from './foo.svg'` returns a React component, while
    // `import url from './foo.svg?url'` still returns a URL string.
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule && rule.test instanceof RegExp && rule.test.test(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    config.module.rules.push(
      {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /url/, // *.svg?url
            type: "asset/resource",
          },
          {
            use: [{ loader: "@svgr/webpack", options: { svgo: false } }],
          },
        ],
      }
    );
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
        source: "/blog/loro-open-source",
        destination: "/blog/loro-now-open-source",
        permanent: true,
      },
      {
        source: "/docs/advanced/replayable_event_graph",
        destination: "/docs/advanced/event_graph_walker",
        permanent: true,
      },
      // Redirects for extracted concept documents
      {
        source: "/docs/advanced/doc_state_and_oplog",
        destination: "/docs/concepts/oplog_docstate",
        permanent: true,
      },
      {
        source: "/docs/advanced/op_and_change",
        destination: "/docs/concepts/operations_changes",
        permanent: true,
      },
      {
        source: "/docs/advanced/event_graph_walker",
        destination: "/docs/concepts/event_graph_walker",
        permanent: true,
      },
      {
        source: "/docs/advanced/shallow_snapshot",
        destination: "/docs/concepts/shallow_snapshots",
        permanent: true,
      },
    ];
  },
});
